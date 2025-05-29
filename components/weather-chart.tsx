"use client"

import { format, parseISO } from "date-fns"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WeatherData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  temperature_2m_mean: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  apparent_temperature_mean: number[]
}

interface WeatherChartProps {
  data: WeatherData
}

export function WeatherChart({ data }: WeatherChartProps) {
  // Transform the data for the chart
  const chartData = data.time.map((time, index) => {
    return {
      date: time,
      "Max Temp": data.temperature_2m_max[index],
      "Min Temp": data.temperature_2m_min[index],
      "Mean Temp": data.temperature_2m_mean[index],
      "Max Apparent": data.apparent_temperature_max[index],
      "Min Apparent": data.apparent_temperature_min[index],
      "Mean Apparent": data.apparent_temperature_mean[index],
    }
  })

  return (
    <ChartContainer
      config={{
        "Max Temp": {
          label: "Maximum Temperature (°C)",
          color: "hsl(var(--chart-1))",
        },
        "Min Temp": {
          label: "Minimum Temperature (°C)",
          color: "hsl(var(--chart-2))",
        },
        "Mean Temp": {
          label: "Mean Temperature (°C)",
          color: "hsl(var(--chart-3))",
        },
        "Max Apparent": {
          label: "Maximum Apparent Temperature (°C)",
          color: "hsl(var(--chart-4))",
        },
        "Min Apparent": {
          label: "Minimum Apparent Temperature (°C)",
          color: "hsl(var(--chart-5))",
        },
        "Mean Apparent": {
          label: "Mean Apparent Temperature (°C)",
          color: "hsl(var(--chart-6))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" tickFormatter={(date) => format(parseISO(date), "MMM dd")} tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fontSize: 12 },
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="Max Temp"
            stroke="var(--color-Max Temp)"
            fill="var(--color-Max Temp)"
            fillOpacity={0.2}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Min Temp"
            stroke="var(--color-Min Temp)"
            fill="var(--color-Min Temp)"
            fillOpacity={0.2}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Mean Temp"
            stroke="var(--color-Mean Temp)"
            fill="var(--color-Mean Temp)"
            fillOpacity={0.2}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Max Apparent"
            stroke="var(--color-Max Apparent)"
            fill="var(--color-Max Apparent)"
            fillOpacity={0.2}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Min Apparent"
            stroke="var(--color-Min Apparent)"
            fill="var(--color-Min Apparent)"
            fillOpacity={0.2}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Mean Apparent"
            stroke="var(--color-Mean Apparent)"
            fill="var(--color-Mean Apparent)"
            fillOpacity={0.2}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
