import { useEffect, useState } from "react";
import { useBookings } from "../hooks/useBookings";
import { AlertCircle, Bus, Download } from "lucide-react";
import BookingDetailModal from "../components/common/BookingDetailModal";
import BookingCard from "../components/common/BookingCard";
import { useFilteredBookings } from "../hooks/useFilterBooking";
import { SkeletonCard } from "../context/BookingContext";
import SearchAndFilters from "../components/common/Filters";
import SortControls from "../components/common/SortControls";

// Replace your BookingsList component with this updated version:
const BookingsList = () => {
  const { selectedBooking, setSelectedBooking, loading, error } = useBookings();
  const filteredBookings = useFilteredBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredBookings.length]);

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
    a.download = `bookings_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
        </div>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error loading bookings
          </h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
        <button
          onClick={exportCSV}
          disabled={loading || filteredBookings.length === 0}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <SearchAndFilters />

      {!loading && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-gray-600">
            Showing {paginatedBookings.length} of {filteredBookings.length}{" "}
            bookings
          </p>
          <SortControls />
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onClick={setSelectedBooking}
              />
            ))}
          </div>

          {paginatedBookings.length === 0 && !loading && (
            <div className="text-center py-12">
              <Bus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum =
              Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            if (pageNum > totalPages) return null;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 border rounded-md transition-colors ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default BookingsList;
