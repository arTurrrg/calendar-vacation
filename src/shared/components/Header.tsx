import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <div>
      <div className="navbar">
        <CalendarDays className="size-6" />
        <span className="logo">Calendar</span>
        <Button variant="outline" className="present-day">
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
          <Button variant="ghost" className="hover-arrow">
            <HoverCard openDelay={300}>
              <HoverCardTrigger>
                <ChevronLeft className="size-6" />
              </HoverCardTrigger>
              <HoverCardContent className="card-content">
                <p>Previous Month</p>
              </HoverCardContent>
            </HoverCard>
          </Button>
          <Button variant="ghost" className="hover-arrow">
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
        <p className="month">June 2024</p>
      </div>
      <div className="types">
        <Select>
          <SelectTrigger className="h-[40px] w-[110px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Day">Day</SelectItem>
            <SelectItem value="Week">Week</SelectItem>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Year">Year</SelectItem>
            <SelectItem value="Schedule">Schedule</SelectItem>
            <SelectItem value="4 days">4 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator className="mb-3 mt-3" />
    </div>
  );
}
