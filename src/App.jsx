import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import BookingsList from "./pages/BookingsList";
import Analytics from "./pages/Analytics";
import { BookingProvider } from "./context/BookingContext";
import Header from "./components/Layout/Header";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || "dashboard";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (pageId) => {
    navigate(`/${pageId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - sticky at top */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* Sidebar - sticky on desktop */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area - scrollable */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<BookingsList />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};
// Update your main App component:
const App = () => {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
};

export default App;
