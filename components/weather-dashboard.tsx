"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { WeatherChart } from "@/components/weather-chart"
import { WeatherTable } from "@/components/weather-table"

interface WeatherData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  temperature_2m_mean: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  apparent_temperature_mean: number[]
}

export function WeatherDashboard() {
  const [latitude, setLatitude] = useState("40.7128")
  const [longitude, setLongitude] = useState("-74.0060")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherData = async () => {
    if (!latitude || !longitude || !startDate || !endDate) {
      setError("Please fill in all fields")
      return
    }

    // Validate latitude and longitude
    const latNum = Number.parseFloat(latitude)
    const lonNum = Number.parseFloat(longitude)

    if (isNaN(latNum) || latNum < -90 || latNum > 90) {
      setError("Latitude must be a number between -90 and 90")
      return
    }

    if (isNaN(lonNum) || lonNum < -180 || lonNum > 180) {
      setError("Longitude must be a number between -180 and 180")
      return
    }

    // Validate date range
    if (startDate > endDate) {
      setError("Start date cannot be after end date")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formattedStartDate = format(startDate, "yyyy-MM-dd")
      const formattedEndDate = format(endDate, "yyyy-MM-dd")

      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean&timezone=auto`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.reason || "Failed to fetch weather data")
      }

      setWeatherData(data.daily)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Weather Parameters</CardTitle>
          <CardDescription>Enter location coordinates and date range to fetch historical weather data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g. 40.7128"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g. -74.0060"
              />
            </div>
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button className="mt-6 w-full sm:w-auto" onClick={fetchWeatherData} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching Data...
              </>
            ) : (
              "Fetch Weather Data"
            )}
          </Button>
          {error && <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>}
        </CardContent>
      </Card>

      {weatherData && !isLoading && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Weather Trends</CardTitle>
              <CardDescription>
                Historical weather data from {format(parseISO(weatherData.time[0]), "PPP")} to{" "}
                {format(parseISO(weatherData.time[weatherData.time.length - 1]), "PPP")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <WeatherChart data={weatherData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weather Data Table</CardTitle>
              <CardDescription>Detailed daily weather measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherTable data={weatherData} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
