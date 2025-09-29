import { useState } from "react";
import { useBookings } from "../../hooks/useBookings";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { formatDate } from "../../utils/formatters.js";

const SearchAndFilters = () => {
  const { filters, setFilters } = useBookings();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const sources = [
    { value: "", label: "All Sources" },
    { value: "mmt", label: "MakeMyTrip" },
    { value: "goibibo", label: "Goibibo" },
    { value: "mybus", label: "MyBus" },
    { value: "personal", label: "Personal" },
  ];

  const statuses = [
    { value: "", label: "All Status" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const clearFilters = () => {
    setFilters({
      search: "",
      source: "",
      dateFrom: "",
      dateTo: "",
      status: "",
      timeFrom: "",
      timeTo: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      {/* Basic Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by passenger name, booking ID, or route..."
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Advanced Filters</span>
          <ChevronDown
            className={`w-4 h-4 transform transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
          />
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.source}
              onChange={(e) =>
                setFilters({ ...filters, source: e.target.value })
              }
            >
              {sources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date From
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date To
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters({ ...filters, dateTo: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time From
            </label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.timeFrom}
              onChange={(e) =>
                setFilters({ ...filters, timeFrom: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time To
            </label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.timeTo}
              onChange={(e) =>
                setFilters({ ...filters, timeTo: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.search && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              Search: "{filters.search}"
            </span>
          )}
          {filters.source && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              Source: {sources.find((s) => s.value === filters.source)?.label}
            </span>
          )}
          {filters.status && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              Status: {statuses.find((s) => s.value === filters.status)?.label}
            </span>
          )}
          {filters.dateFrom && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              From: {formatDate(filters.dateFrom)}
            </span>
          )}
          {filters.dateTo && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              To: {formatDate(filters.dateTo)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
