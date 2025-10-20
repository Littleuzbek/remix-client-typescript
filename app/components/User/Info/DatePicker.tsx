"use client"

import { useState, useRef, useEffect } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  setMonth,
  setYear,
} from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import "./datePicker.css"

interface DatePickerProps {
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

type ViewType = "days" | "months" | "years"

export function DatePicker({ onDateChange, placeholder = "Select date", className = "" }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>()
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<"top" | "bottom">("top")
  const [view, setView] = useState<ViewType>("days")
  const datePickerRef = useRef<HTMLDivElement>(null)
  const yearsScrollRef = useRef<HTMLDivElement>(null)

  const handleDateSelect = (day: Date) => {
    setDate(day)
    setIsOpen(false)
    setView("days")
    if (onDateChange) {
      onDateChange(day)
    }
  }

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = setMonth(currentMonth, monthIndex)
    setCurrentMonth(newDate)
    setView("days")
  }

  const handleYearSelect = (year: number) => {
    const newDate = setYear(currentMonth, year)
    setCurrentMonth(newDate)
    setView("days")
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Close the date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (placeholder === "Tug'ilgan sana") {
      setDate(undefined)
    }
  }, [placeholder])

  useEffect(() => {
    if (isOpen && datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect()
      const spaceAbove = rect.top
      const requiredSpace = 340

      if (spaceAbove < requiredSpace) {
        setPosition("bottom")
      } else {
        setPosition("top")
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (view === "years" && yearsScrollRef.current) {
      const currentYear = currentMonth.getFullYear()
      const yearElement = document.getElementById(`year-${currentYear}`)
      if (yearElement) {
        yearElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [view, currentMonth])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const years = Array.from({ length: 66 }, (_, i) => 1960 + i)

  return (
    <div
      className={`date-picker ${className} w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[1.2rem] border-2 border-[black] relative focus:outline-none `}
      ref={datePickerRef}
    >
      <div
        className="date-picker-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        role="button"
      >
        <CalendarIcon className="date-picker-icon" />
        <span>{date ? format(date, "MMMM d, yyyy") : placeholder}</span>
      </div>

      {isOpen && (
        <div
          className={`date-picker-popup ${position === "bottom" ? "date-picker-popup-bottom" : ""}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="date-picker-header">
            {view === "days" && (
              <>
                <button
                  className="month-nav-button"
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                  type="button"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="month-year-selector">
                  <button className="month-year-button" onClick={() => setView("months")} type="button">
                    {format(currentMonth, "MMMM")}
                  </button>
                  <button className="month-year-button" onClick={() => setView("years")} type="button">
                    {format(currentMonth, "yyyy")}
                  </button>
                </div>
                <button type="button" className="month-nav-button" onClick={handleNextMonth} aria-label="Next month">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            {view === "months" && (
              <>
                <button
                  className="month-nav-button"
                  onClick={() => setView("days")}
                  aria-label="Back to days"
                  type="button"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2>{format(currentMonth, "yyyy")}</h2>
                <div style={{ width: "30px" }} />
              </>
            )}
            {view === "years" && (
              <>
                <button
                  className="month-nav-button"
                  onClick={() => setView("days")}
                  aria-label="Back to days"
                  type="button"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2>Select Year</h2>
                <div style={{ width: "30px" }} />
              </>
            )}
          </div>

          {view === "days" && (
            <>
              <div className="date-picker-days-header">
                {dayNames.map((day) => (
                  <div key={day} className="day-name">
                    {day}
                  </div>
                ))}
              </div>

              <div className="date-picker-grid">
                {daysInMonth.map((day) => (
                  <button
                    key={day.toString()}
                    className={`date-cell ${isSameDay(day, date || new Date(0)) ? "selected" : ""}`}
                    onClick={() => handleDateSelect(day)}
                    aria-label={format(day, "MMMM d, yyyy")}
                    aria-selected={date ? isSameDay(day, date) : false}
                  >
                    {format(day, "d")}
                  </button>
                ))}
              </div>
            </>
          )}

          {view === "months" && (
            <div className="months-grid">
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  className={`month-cell ${currentMonth.getMonth() === index ? "selected" : ""}`}
                  onClick={() => handleMonthSelect(index)}
                  type="button"
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          )}

          {view === "years" && (
            <div className="years-container" ref={yearsScrollRef}>
              {years.map((year) => (
                <button
                  key={year}
                  id={`year-${year}`}
                  className={`year-cell ${currentMonth.getFullYear() === year ? "selected" : ""}`}
                  onClick={() => handleYearSelect(year)}
                  type="button"
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
