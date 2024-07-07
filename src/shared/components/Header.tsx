import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import useCalendarSlider, { CalendarView } from "./CalendarSlider";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function Header() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
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
  ];

  const currentDate = new Date();
  const currentDayOfWeekIndex = new Date().getDay();
  const currentDayOfMonth = currentDate.getDate();
  const currentDayOfWeek = daysOfWeek[currentDayOfWeekIndex];
  const currentMonthIndex = currentDate.getMonth();
  const currentMonth = monthsOfYear[currentMonthIndex];
  const info = `${currentDayOfWeek}, ${currentMonth} ${currentDayOfMonth}`;

  const { setCurrentDate, navigateDate, currentMonthLabel, setCurrentView } =
    useCalendarSlider();

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (value: string) => {
    setCurrentView(value.toLowerCase() as CalendarView);
  };
  return (
    <div>
      <div className="ml-[3%] mt-4 flex items-center">
        <Link to="/" className="flex items-center">
          <CalendarDays className="size-6" />
          <span className="logo">Calendar</span>
        </Link>
        <Button
          variant="outline"
          className="present-day"
          onClick={handleTodayClick}
        >
          <HoverCard openDelay={300}>
            <HoverCardTrigger>
              <span>Today</span>
            </HoverCardTrigger>
            <HoverCardContent className="card-content">
              <p>{info}</p>
            </HoverCardContent>
          </HoverCard>
        </Button>
        <div className="arrows">
          <Button
            variant="ghost"
            className="hover-arrow"
            onClick={() => navigateDate("PREV")}
          >
            <HoverCard openDelay={300}>
              <HoverCardTrigger>
                <ChevronLeft className="size-6" />
              </HoverCardTrigger>
              <HoverCardContent className="card-content">
                <p>Previous Month</p>
              </HoverCardContent>
            </HoverCard>
          </Button>
          <Button
            variant="ghost"
            className="hover-arrow"
            onClick={() => navigateDate("NEXT")}
          >
            <HoverCard openDelay={300}>
              <HoverCardTrigger>
                <ChevronRight className="size-6" />
              </HoverCardTrigger>
              <HoverCardContent className="card-content">
                <p>Next Month</p>
              </HoverCardContent>
            </HoverCard>
          </Button>
        </div>
        <p className="month">{currentMonthLabel}</p>
      </div>
      <div className="types">
        <Select onValueChange={handleViewChange}>
          <SelectTrigger className="h-[40px] w-[110px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator className="mb-3 mt-3" />
    </div>
  );
}
