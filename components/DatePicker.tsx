"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, setYear } from "date-fns"

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
  const [month, setMonth] = React.useState<Date>(date || new Date())
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 100 }, (_, i) => currentYear - i)
  }, [])

  React.useEffect(() => {
    if (date) {
      setMonth(date)
    }
  }, [date])

  const handleYearChange = (selectedYear: string) => {
    const newYear = parseInt(selectedYear)
    const newMonth = setYear(month, newYear)
    setMonth(newMonth)
    if (date) {
      setDate(setYear(date, newYear))
    }
  }

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    if (newDate) {
      setMonth(newDate)
    }
    setIsCalendarOpen(false)
  }

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="font-semibold">Select Date</h3>
          <Select onValueChange={handleYearChange} value={month.getFullYear().toString()}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
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
          onSelect={handleDateSelect}
          month={month}
          onMonthChange={setMonth}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
