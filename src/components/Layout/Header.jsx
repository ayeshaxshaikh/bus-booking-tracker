import { Bus, Menu, User } from "lucide-react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Bus className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">BusTracker Pro</h1>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span className="text-sm text-gray-600">Welcome, Bus Contractor</span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;