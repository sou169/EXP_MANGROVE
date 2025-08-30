# MangroveWatch - Community Conservation Platform

A participatory monitoring system where coastal communities, fishermen, and citizen scientists can report environmental threats in mangrove areas via a modern web application.

## 🌿 Features

### For Citizens & Community Members
- **Photo Capture**: Take photos of environmental incidents with GPS location
- **Incident Reporting**: Report various types of environmental threats
- **Gamification**: Earn points and badges for contributions
- **Leaderboard**: Compete with other community members
- **Profile Management**: Track your conservation journey

### For Authorities & NGOs
- **Dashboard**: Monitor all reported incidents
- **Report Management**: Verify, investigate, and resolve reports
- **Filtering & Search**: Find specific incidents by type, status, or severity
- **Status Updates**: Manage the lifecycle of each report

### Environmental Threat Types
- 🪓 Illegal Tree Cutting
- 🗑️ Waste Dumping
- 🛢️ Water Pollution
- 🌊 Coastal Erosion
- 🏗️ Illegal Construction
- ⚠️ Other Environmental Threats

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MangroveGuard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
MangroveGuard/
├── src/
│   ├── components/ui/          # Reusable UI components
│   ├── entities/               # Data models (User, Report)
│   ├── integrations/           # External service integrations
│   ├── utils/                  # Utility functions
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── Components/                  # Feature-specific components
├── Pages/                      # Application pages
├── Layout.js                   # Main layout component
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite build configuration
└── README.md                   # This file
```

## 🎨 Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 🔧 Configuration

### Tailwind CSS
The application uses a custom color palette inspired by ocean and mangrove themes:
- Primary Teal: `#0d9488`
- Primary Blue: `#0891b2`
- Emerald: `#059669`
- Ocean Deep: `#164e63`

### Environment Variables
Currently, the application uses mock data. In production, you would need to configure:
- API endpoints for backend services
- File upload services (AWS S3, Cloudinary, etc.)
- Authentication services
- Database connections

## 📱 Features in Detail

### 1. Incident Reporting
- **Photo Capture**: Use device camera or upload photos
- **GPS Location**: Automatic location detection with fallback
- **Incident Classification**: Categorized threat types
- **Description**: Detailed incident documentation
- **Real-time Validation**: Form validation and error handling

### 2. Gamification System
- **Points System**: Earn points for each report
- **Badge Levels**: 
  - Novice (0-99 points)
  - Watcher (100-499 points)
  - Protector (500-999 points)
  - Guardian (1000+ points)
- **Leaderboard**: Community ranking system
- **Achievement Timeline**: Track your progress

### 3. Authority Dashboard
- **Report Overview**: Statistics and metrics
- **Filtering System**: Search by status, severity, type
- **Status Management**: Update report lifecycle
- **Quick Actions**: Verify, investigate, resolve reports
- **Detailed View**: Full report information with photos

### 4. Map View
- **Incident Mapping**: Visual representation of threats
- **Filtering**: Find specific types of incidents
- **Location Details**: GPS coordinates and addresses
- **Status Tracking**: Monitor investigation progress

## 🚧 Current Limitations & Future Enhancements

### Current (Demo Version)
- Mock data storage (localStorage)
- Simulated API calls
- Basic photo handling
- Static map placeholder

### Planned Enhancements
- **Real Backend Integration**: Node.js/Express or Python/FastAPI
- **Database**: PostgreSQL with PostGIS for spatial data
- **Real-time Updates**: WebSocket integration
- **Advanced Mapping**: Leaflet or Mapbox integration
- **AI Validation**: Computer vision for photo analysis
- **Mobile App**: React Native or Flutter
- **SMS Integration**: Twilio for offline reporting
- **Satellite Data**: Integration with satellite imagery APIs
- **Push Notifications**: Real-time alerts for authorities
- **Analytics Dashboard**: Advanced reporting and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Community Conservation**: Inspired by real-world mangrove protection efforts
- **Open Source**: Built with amazing open-source tools and libraries
- **Design System**: Custom design inspired by ocean and nature themes

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the repository
- Contact the development team
- Join our community discussions

---

**Together for healthier mangroves** 🌿🌊
