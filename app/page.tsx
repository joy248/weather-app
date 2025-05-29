import { WeatherDashboard } from "@/components/weather-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">Historical Weather Dashboard</h1>
        <WeatherDashboard />
      </div>
    </main>
  )
}
