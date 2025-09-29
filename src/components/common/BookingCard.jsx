import { ChevronRight } from "lucide-react";
import { formatCurrency, formatDate, formatTime } from "../../utils/formatters";

const BookingCard = ({ booking, onClick }) => {
  console.log(booking);
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div
      className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(booking)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">
            {booking.passengerName}
          </h3>
          <p className="text-sm text-gray-600">ID: {booking.id}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[booking.status]
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-gray-500">From</p>
          <p className="text-sm font-medium">{booking.origin}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">To</p>
          <p className="text-sm font-medium">{booking.destination}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{formatDate(booking.date)}</span>
          <span className="text-gray-600">{formatTime(booking.time)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-green-600">
            {formatCurrency(booking.fare)}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 pt-2 border-t">
        <span className="text-xs text-gray-500">{booking.seats} seat(s)</span>
      </div>
    </div>
  );
};

export default BookingCard;