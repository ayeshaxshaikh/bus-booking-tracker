import { useMemo } from "react";
import { useBookings } from "./useBookings";

export const useFilteredBookings = () => {
  const { bookings, filters, sortConfig } = useBookings();

  return useMemo(() => {
    let filtered = bookings.filter((booking) => {
      // Search filter (passenger name, booking ID, origin, destination)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          booking.passengerName.toLowerCase().includes(searchTerm) ||
          booking.id.toLowerCase().includes(searchTerm) ||
          booking.origin.toLowerCase().includes(searchTerm) ||
          booking.destination.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Source filter
      if (filters.source && booking.source !== filters.source) {
        return false;
      }

      // Status filter
      if (filters.status && booking.status !== filters.status) {
        return false;
      }

      // Date range filters
      if (filters.dateFrom && booking.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && booking.date > filters.dateTo) {
        return false;
      }

      // Time range filters
      if (filters.timeFrom || filters.timeTo) {
        const bookingTime = booking.time;
        if (filters.timeFrom && bookingTime < filters.timeFrom) {
          return false;
        }
        if (filters.timeTo && bookingTime > filters.timeTo) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === "fare" || sortConfig.key === "seats") {
          aVal = Number(aVal);
          bVal = Number(bVal);
        } else if (sortConfig.key === "passengerName") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (sortConfig.direction === "asc") {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [bookings, filters, sortConfig]);
};
