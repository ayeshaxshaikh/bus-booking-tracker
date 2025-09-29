# Bus Booking Tracker

A comprehensive React application for bus contractors to track and manage bookings from multiple sources including MakeMyTrip, Goibibo, MyBus, and Personal Bookings.

## 🚀 Features

- **Dashboard Analytics**: Real-time KPIs, booking trends, and source distribution
- **Booking Management**: Advanced filtering, search, sorting, and detailed views
- **Analytics & Reports**: Multiple chart types, route analysis, and CSV exports
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time Data**: Mock data with 75+ realistic bookings for demonstration

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bus-booking-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Header, Sidebar
│   ├── common/         # Cards, Modals, Filters
│   └── charts/         # Chart components
├── pages/              # Main page components
├── context/            # React Context providers
├── services/           # API and mock data services
├── utils/              # Utility functions and constants
├── hooks/              # Custom React hooks
└── App.jsx             # Main application component
```

## 🎯 Key Components

### Dashboard
- KPI cards showing total bookings, revenue, and averages
- Interactive charts for booking trends and source distribution
- Quick statistics overview

### Bookings Management
- Advanced filtering by source, date range, status
- Search functionality for passengers and booking IDs
- Sortable columns with pagination
- Detailed booking modal views

### Analytics & Reports
- Source performance analysis
- Hourly booking distribution
- Top routes identification
- CSV export functionality

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_NAME=Bus Booking Tracker
VITE_API_BASE_URL=your-api-url-here
```

### Customization
- Modify `src/utils/constants.js` for business-specific settings
- Update `tailwind.config.js` for custom styling
- Adjust mock data in `src/services/mockData.js`

## 📊 Mock Data

The application includes 75+ mock bookings with:
- Realistic Indian city routes
- Multiple booking sources
- Various time slots and dates
- Different booking statuses
- Appropriate fare calculations

## 🚀 Deployment

### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Manual Deployment
1. Run `npm run build`
2. Deploy the contents of `dist` folder to your hosting service

## 🔮 Future Enhancements

- [ ] Real API integration
- [ ] User authentication
- [ ] Email notifications
- [ ] Advanced reporting features
- [ ] Mobile app version
- [ ] Real-time updates via WebSocket

## 🐛 Known Limitations

- Currently uses mock data (no backend integration)
- No user authentication system
- Limited to predefined Indian cities
- No real-time data updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Contact**: [Your Email]

## 🙏 Acknowledgments

- Recharts for excellent charting library
- Lucide React for beautiful icons
- Tailwind CSS for utility-first styling
- Vite for fast development experience