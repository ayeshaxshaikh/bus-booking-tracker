import { createContext, useEffect, useState } from "react";
import generateMockBookings from "../services/generateBookings";

export const BookingContext = createContext();

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-white border rounded-lg p-4 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-3">
      <div className="space-y-1">
        <div className="h-3 bg-gray-200 rounded w-8"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="space-y-1">
        <div className="h-3 bg-gray-200 rounded w-8"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    source: "",
    dateFrom: "",
    dateTo: "",
    status: "",
    timeFrom: "",
    timeTo: "",
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc",
  });

  // Simulate loading
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockBookings = generateMockBookings();
        setBookings(mockBookings);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        filters,
        setFilters,
        selectedBooking,
        setSelectedBooking,
        sortConfig,
        setSortConfig,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
