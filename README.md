# Historical Weather Dashboard

A responsive and interactive dashboard that allows users to view historical weather data for specific locations and date ranges using the Open-Meteo Historical Weather API.

![Weather Dashboard](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

- **📍 Location Input**: Enter latitude and longitude coordinates with validation
- **📅 Date Range Selection**: Choose start and end dates for historical data
- **📊 Interactive Chart**: Visualize temperature trends over time with multiple data series
- **📋 Data Table**: View detailed daily measurements with pagination (10/20/50 rows per page)
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **⚠️ Error Handling**: User-friendly error messages for invalid inputs or API failures
- **⏳ Loading States**: Visual feedback during data fetching
- **🎨 Modern UI**: Clean, professional interface using shadcn/ui components

## 🌡️ Weather Data Variables

The dashboard displays the following daily weather variables:
- Maximum Temperature (2m)
- Minimum Temperature (2m)
- Mean Temperature (2m)
- Maximum Apparent Temperature (2m)
- Minimum Apparent Temperature (2m)
- Mean Apparent Temperature (2m)

## 🚀 Live Demo

[View the live demo](https://your-deployment-url.vercel.app)

## 🛠️ Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript for better development experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern UI component library
- **[Recharts](https://recharts.org/)** - Charting library for React
- **[date-fns](https://date-fns.org/)** - JavaScript date utility library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or later
- **npm** or **yarn** package manager

## ⚡ Quick Start

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/yourusername/historical-weather-dashboard.git
cd historical-weather-dashboard
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Start the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

### 4. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Building for Production

### Build the application

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

### Start the production server

\`\`\`bash
npm start
# or
yarn start
\`\`\`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and import your project
3. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/historical-weather-dashboard)

### Other Deployment Options

- **Netlify**: Connect your GitHub repo and deploy
- **Railway**: Deploy with \`railway up\`
- **Docker**: Use the included Dockerfile for containerized deployment

## 🌐 API Information

This project uses the [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api):

- **Free for non-commercial use**
- **No API key required**
- **Rate limits apply** (10,000 requests per day)
- **Endpoint**: \`https://archive-api.open-meteo.com/v1/archive\`

### API Parameters Used

\`\`\`
latitude: Geographical WGS84 coordinate
longitude: Geographical WGS84 coordinate
start_date: Start date (YYYY-MM-DD)
end_date: End date (YYYY-MM-DD)
daily: temperature_2m_max,temperature_2m_min,temperature_2m_mean,
       apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean
timezone: auto
\`\`\`

## 📖 Usage Guide

### 1. Enter Location Coordinates
- **Latitude**: Enter a value between -90 and 90
- **Longitude**: Enter a value between -180 and 180
- Example: New York City (40.7128, -74.0060)

### 2. Select Date Range
- Click on the date pickers to select start and end dates
- Maximum range depends on API limitations
- Historical data is available from 1940 onwards

### 3. Fetch Data
- Click "Fetch Weather Data" to retrieve information
- Loading spinner will appear during data fetching
- Error messages will display for invalid inputs

### 4. View Results
- **Chart View**: Interactive area chart showing temperature trends
- **Table View**: Paginated table with detailed daily measurements
- Use pagination controls to navigate through large datasets

## 📁 Project Structure

\`\`\`
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page component
│   └── globals.css              # Global styles and Tailwind imports
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── weather-dashboard.tsx    # Main dashboard component
│   ├── weather-chart.tsx        # Chart visualization component
│   ├── weather-table.tsx        # Data table component
│   └── theme-provider.tsx       # Theme provider component
├── lib/                         # Utility functions
│   └── utils.ts                 # Common utilities (cn function)
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind CSS configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
\`\`\`

## 🎨 Customization

### Styling
- Modify \`tailwind.config.ts\` for custom colors and themes
- Update \`app/globals.css\` for global styles
- Components use CSS variables for easy theming

### Chart Configuration
- Edit \`components/weather-chart.tsx\` to modify chart appearance
- Add or remove data series as needed
- Customize colors in the chart config

### Table Features
- Modify pagination options in \`components/weather-table.tsx\`
- Add sorting or filtering capabilities
- Customize column display

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow the existing code formatting
- Use meaningful component and variable names
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing the free weather API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for hosting and deployment platform

## 📞 Support

If you have any questions or run into issues, please:

1. Check the [Issues](https://github.com/yourusername/historical-weather-dashboard/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

**Made with ❤️ using Next.js and Open-Meteo API**
