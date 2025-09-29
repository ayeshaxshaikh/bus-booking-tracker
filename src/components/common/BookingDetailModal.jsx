import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import { formatCurrency, formatTime, formatDate } from "../../utils/formatters";

const BookingDetailModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const statusIcons = {
    confirmed: CheckCircle,
    pending: AlertCircle,
    cancelled: X,
  };

  const statusColors = {
    confirmed: "text-green-600",
    pending: "text-yellow-600",
    cancelled: "text-red-600",
  };

  const StatusIcon = statusIcons[booking.status];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <StatusIcon className={`w-6 h-6 ${statusColors[booking.status]}`} />
            <div>
              <h3 className="font-semibold text-gray-900">
                {booking.passengerName}
              </h3>
              <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">
                Journey Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">From:</span> {booking.origin}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">To:</span>{" "}
                    {booking.destination}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(booking.date)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">Time:</span>{" "}
                    {formatTime(booking.time)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">
                Booking Information
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Source</span>
                  <p className="font-semibold">{booking.sourceName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <p
                    className={`font-semibold capitalize ${
                      statusColors[booking.status]
                    }`}
                  >
                    {booking.status}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Seats</span>
                  <p className="font-semibold">{booking.seats} passenger(s)</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Total Fare</span>
                  <p className="font-semibold text-green-600 text-lg">
                    {formatCurrency(booking.fare)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {(booking.phoneNumber ||
            booking.busNumber ||
            booking.seatNumbers) && (
            <div className="pt-4 border-t">
              <h4 className="font-medium text-gray-900 mb-4">
                Additional Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {booking.phoneNumber && (
                  <div>
                    <span className="text-sm text-gray-500">
                      Contact Number
                    </span>
                    <p className="font-medium">{booking.phoneNumber}</p>
                  </div>
                )}
                {booking.busNumber && (
                  <div>
                    <span className="text-sm text-gray-500">Bus Number</span>
                    <p className="font-medium">{booking.busNumber}</p>
                  </div>
                )}
                {booking.seatNumbers && (
                  <div>
                    <span className="text-sm text-gray-500">Seat Numbers</span>
                    <p className="font-medium">{booking.seatNumbers}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookingDetailModal;
