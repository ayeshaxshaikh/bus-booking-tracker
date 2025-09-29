import { ArrowUpDown } from "lucide-react";
import { useBookings } from "../../hooks/useBookings";

const SortControls = () => {
  const { sortConfig, setSortConfig } = useBookings();

  const sortOptions = [
    { key: "timestamp", label: "Date & Time" },
    { key: "passengerName", label: "Passenger Name" },
    { key: "fare", label: "Fare" },
    { key: "source", label: "Source" },
    { key: "status", label: "Status" },
  ];

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <span className="text-sm text-gray-600 flex items-center">
        <ArrowUpDown className="w-4 h-4 mr-1" />
        Sort by:
      </span>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => handleSort(option.key)}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              sortConfig.key === option.key
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label}
            {sortConfig.key === option.key && (
              <span className="ml-1">
                {sortConfig.direction === "asc" ? "↑" : "↓"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortControls;
