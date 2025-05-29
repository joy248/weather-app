"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WeatherData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  temperature_2m_mean: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  apparent_temperature_mean: number[]
}

interface WeatherTableProps {
  data: WeatherData
}

export function WeatherTable({ data }: WeatherTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Calculate total pages
  const totalItems = data.time.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)

  // Get current page data
  const indexOfLastItem = currentPage * rowsPerPage
  const indexOfFirstItem = indexOfLastItem - rowsPerPage
  const currentItems = data.time.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Handle rows per page change
  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number.parseInt(value))
    setCurrentPage(1) // Reset to first page when changing rows per page
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select value={rowsPerPage.toString()} onValueChange={handleRowsPerPageChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rowsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Max Temp (°C)</TableHead>
              <TableHead>Min Temp (°C)</TableHead>
              <TableHead>Mean Temp (°C)</TableHead>
              <TableHead>Max Apparent (°C)</TableHead>
              <TableHead>Min Apparent (°C)</TableHead>
              <TableHead>Mean Apparent (°C)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((time, index) => {
              const dataIndex = data.time.indexOf(time)
              return (
                <TableRow key={time}>
                  <TableCell className="font-medium">{format(parseISO(time), "MMM dd, yyyy")}</TableCell>
                  <TableCell>{data.temperature_2m_max[dataIndex]?.toFixed(1) || "N/A"}</TableCell>
                  <TableCell>{data.temperature_2m_min[dataIndex]?.toFixed(1) || "N/A"}</TableCell>
                  <TableCell>{data.temperature_2m_mean[dataIndex]?.toFixed(1) || "N/A"}</TableCell>
                  <TableCell>{data.apparent_temperature_max[dataIndex]?.toFixed(1) || "N/A"}</TableCell>
                  <TableCell>{data.apparent_temperature_min[dataIndex]?.toFixed(1) || "N/A"}</TableCell>
                  <TableCell>{data.apparent_temperature_mean[dataIndex]?.toFixed(1) || "N/A"}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            let pageNumber: number

            // Logic to show pages around current page
            if (totalPages <= 5) {
              pageNumber = index + 1
            } else if (currentPage <= 3) {
              pageNumber = index + 1
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + index
            } else {
              pageNumber = currentPage - 2 + index
            }

            // Only render if pageNumber is valid
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => paginate(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            return null
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
