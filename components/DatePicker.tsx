"use client"

import * as React from "react"
import { format, addYears, subYears } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [selectedYear, setSelectedYear] = React.useState<number>(date?.getFullYear() || new Date().getFullYear())

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 100 }, (_, i) => currentYear - i)
  }, [])

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year)
    setSelectedYear(newYear)
    if (date) {
      const newDate = new Date(date)
      newDate.setFullYear(newYear)
      setDate(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col items-center p-2">
          <p className="text-sm text-muted-foreground mb-2">Select a different year</p>
          <Select onValueChange={handleYearChange} value={selectedYear.toString()}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          defaultMonth={date || new Date(selectedYear, 0)}
        />
      </PopoverContent>
    </Popover>
  )
}
