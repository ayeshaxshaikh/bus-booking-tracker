import { useMemo } from "react";
import { useBookings } from "../hooks/useBookings";
import KPICard from "../components/common/KPICard";
import { Bus, Calendar, CreditCard, TrendingUp } from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { useFilteredBookings } from "../hooks/useFilterBooking";
import SearchAndFilters from "../components/common/Filters";
import {
  LineChartFixed,
  PieChartFixed,
} from "../components/charts/SourceDIstributionChart";

const Dashboard = () => {
  const { bookings } = useBookings();
  const filteredBookings = useFilteredBookings();

  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.date === today);

  const sourceStats = useMemo(() => {
    const stats = {};
    filteredBookings.forEach((booking) => {
      stats[booking.sourceName] = (stats[booking.sourceName] || 0) + 1;
    });

    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [filteredBookings]);

  const dailyStats = useMemo(() => {
    if (filteredBookings.length === 0) return [];

    // Find min/max date from filtered
    const dates = filteredBookings.map((b) => new Date(b.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const dateRange = [];

    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const count = filteredBookings.filter((b) => b.date === dateStr).length;
      dateRange.push({
        date: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        bookings: count,
      });
    }

    return dateRange;
    // Old fixed 7 days code
  }, [filteredBookings]); // Depend on filtered

  const totalRevenue = filteredBookings.reduce(
    (sum, booking) => sum + booking.fare,
    0
  );

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </div>

      <SearchAndFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Bookings"
          value={filteredBookings.length}
          icon={Bus}
          color="blue"
        />
        <KPICard
          title="Today's Bookings"
          value={todayBookings.length}
          icon={Calendar}
          trend={12}
          color="green"
        />
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={CreditCard}
          color="purple"
        />
        <KPICard
          title="Avg. Booking Value"
          value={formatCurrency(totalRevenue / (filteredBookings.length || 1))}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Booking Trend (Last 7 Days)
          </h3>
          <LineChartFixed data={dailyStats} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Bookings by Source</h3>
          <PieChartFixed data={sourceStats} colors={COLORS} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
