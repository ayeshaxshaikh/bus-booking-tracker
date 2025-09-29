import React, { useMemo } from "react";
import { Bus, CreditCard, Download, TrendingUp } from "lucide-react";
import KPICard from "../components/common/KPICard";
import { useFilteredBookings } from "../hooks/useFilterBooking";
import SearchAndFilters from "../components/common/Filters";
import { formatCurrency } from "../utils/formatters";
import {
  BarChartFixed,
  StatusPieChartFixed,
} from "../components/charts/SourceDIstributionChart";

export const TimeHeatmap = ({ bookings }) => {
  const heatmapData = useMemo(() => {
    const data = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Initialize grid
    const grid = {};
    days.forEach((day) => {
      grid[day] = {};
      hours.forEach((hour) => {
        grid[day][hour] = 0;
      });
    });
 
    // Fill with booking data
    bookings.forEach((booking) => {
      const date = new Date(booking.date + "T" + booking.time);
      const day = days[date.getDay()];
      const hour = date.getHours();
      grid[day][hour]++;
    });

    // Convert to array format
    days.forEach((day, dayIndex) => {
      hours.forEach((hour) => {
        data.push({
          day,
          hour,
          value: grid[day][hour],
          dayIndex,
          hourIndex: hour,
        });
      });
    });

    return data;
  }, [bookings]);

  const maxValue = Math.max(...heatmapData.map((d) => d.value));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">
        Booking Heatmap (Day vs Hour)
      </h3>
      <div className="overflow-x-auto">
        <div className="grid gap-1 min-w-[800px] grid-cols-[repeat(25,minmax(0,1fr))]">
          {/* Header row for hours */}
          <div></div>
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="text-xs text-center p-1 font-medium">
              {i.toString().padStart(2, "0")}
            </div>
          ))}

          {/* Data rows */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <React.Fragment key={day}>
              <div className="text-xs font-medium p-1 flex items-center">
                {day}
              </div>
              {Array.from({ length: 24 }, (_, hour) => {
                const dataPoint = heatmapData.find(
                  (d) => d.day === day && d.hour === hour
                );
                const intensity = dataPoint
                  ? dataPoint.value / Math.max(maxValue, 1)
                  : 0;
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="aspect-square rounded border border-gray-200 flex items-center justify-center text-xs hover:border-blue-400 transition-colors cursor-pointer"
                    style={{
                      backgroundColor:
                        intensity > 0
                          ? `rgba(59, 130, 246, ${Math.max(0.1, intensity)})`
                          : "#f9fafb",
                    }}
                    title={`${day} ${hour}:00 - ${
                      dataPoint?.value || 0
                    } bookings`}
                  >
                    {dataPoint?.value > 0 ? dataPoint.value : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
          <span>Less</span>
          <div className="flex items-center space-x-1">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
              <div
                key={intensity}
                className="w-3 h-3 rounded border"
                style={{
                  backgroundColor:
                    intensity > 0
                      ? `rgba(59, 130, 246, ${intensity})`
                      : "#f9fafb",
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

const Analytics = () => {
  const filteredBookings = useFilteredBookings();

  const sourceStats = useMemo(() => {
    const stats = {};
    const revenue = {};

    filteredBookings.forEach((booking) => {
      stats[booking.sourceName] = (stats[booking.sourceName] || 0) + 1;
      revenue[booking.sourceName] =
        (revenue[booking.sourceName] || 0) + booking.fare;
    });

    return Object.entries(stats).map(([name, bookings]) => ({
      name,
      bookings,
      revenue: revenue[name] || 0,
    }));
  }, [filteredBookings]);

  const timeDistribution = useMemo(() => {
    const hourStats = {};

    filteredBookings.forEach((booking) => {
      const hour = parseInt(booking.time.split(":")[0]);
      const timeSlot = `${hour.toString().padStart(2, "0")}:00`;
      hourStats[timeSlot] = (hourStats[timeSlot] || 0) + 1;
    });

    return Object.entries(hourStats)
      .map(([time, bookings]) => ({ time, bookings }))
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [filteredBookings]);

  const statusStats = useMemo(() => {
    const stats = {};
    filteredBookings.forEach((booking) => {
      stats[booking.status] = (stats[booking.status] || 0) + 1;
    });

    return Object.entries(stats).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
    }));
  }, [filteredBookings]);

  const routeStats = useMemo(() => {
    const routes = {};

    filteredBookings.forEach((booking) => {
      const route = `${booking.origin} → ${booking.destination}`;
      routes[route] = (routes[route] || 0) + 1;
    });

    return Object.entries(routes)
      .map(([route, bookings]) => ({ route, bookings }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 10);
  }, [filteredBookings]);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  const exportCSV = () => {
    const headers = [
      "Booking ID",
      "Passenger Name",
      "Source",
      "Origin",
      "Destination",
      "Date",
      "Time",
      "Seats",
      "Fare",
      "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredBookings.map((booking) =>
        [
          booking.id,
          `"${booking.passengerName}"`,
          booking.sourceName,
          booking.origin,
          booking.destination,
          booking.date,
          booking.time,
          booking.seats,
          booking.fare,
          booking.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics_report_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics & Reports
        </h1>
        <button
          onClick={exportCSV}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <SearchAndFilters />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Bookings"
          value={filteredBookings.length}
          icon={Bus}
          color="blue"
        />
        <KPICard
          title="Total Revenue"
          value={formatCurrency(
            filteredBookings.reduce((sum, b) => sum + b.fare, 0)
          )}
          icon={CreditCard}
          color="green"
        />
        <KPICard
          title="Avg Fare"
          value={formatCurrency(
            filteredBookings.reduce((sum, b) => sum + b.fare, 0) /
              (filteredBookings.length || 1)
          )}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Bookings by Source</h3>
          <BarChartFixed
            data={sourceStats}
            dataKey="bookings"
            color="#3B82F6"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Revenue by Source</h3>
          <BarChartFixed
            data={sourceStats}
            dataKey="revenue"
            color="#10B981"
            formatter={formatCurrency}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Hourly Booking Distribution
          </h3>
          <BarChartFixed
            data={timeDistribution}
            dataKey="bookings"
            color="#F59E0B"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Booking Status Distribution
          </h3>
          <StatusPieChartFixed data={statusStats} colors={COLORS} />
        </div>
      </div>

      <TimeHeatmap bookings={filteredBookings} />

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Top Routes</h3>
        <div className="space-y-3">
          {routeStats.map((route, index) => (
            <div
              key={route.route}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="font-medium">{route.route}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {route.bookings} bookings
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (route.bookings / (routeStats[0]?.bookings || 1)) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          {routeStats.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No routes found for the current filters.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sourceStats.map((source, index) => (
          <div
            key={source.name}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{source.name}</h4>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bookings</span>
                <span className="font-semibold">{source.bookings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(source.revenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg per booking</span>
                <span className="font-semibold">
                  {formatCurrency(source.revenue / (source.bookings || 1))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
