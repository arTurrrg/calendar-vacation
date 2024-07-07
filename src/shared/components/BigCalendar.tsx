import React from "react";
import {
  momentLocalizer,
  Event,
  Calendar,
  NavigateAction,
  View,
} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalendarSlider, { CalendarView } from "./CalendarSlider";

const localizer = momentLocalizer(moment);
const DndCalendar = withDragAndDrop(Calendar);

interface MyEvent extends Event {
  title: string;
  start: Date;
  end: Date;
}

interface BigCalendarProps {
  events: MyEvent[];
}

const BigCalendar: React.FC<BigCalendarProps> = ({ events }) => {
  const {
    currentDate,
    setCurrentDate,
    navigateDate,
    currentView,
    setCurrentView,
  } = useCalendarSlider();

  return (
    <div className="h-[41.1vw]">
      <DndCalendar
        date={currentDate}
        onNavigate={(newDate: Date, _view: string, action: NavigateAction) => {
          if (action === "PREV") navigateDate("PREV");
          else if (action === "NEXT") navigateDate("NEXT");
          else if (action === "TODAY") setCurrentDate(new Date());
          else setCurrentDate(newDate);
        }}
        events={events}
        localizer={localizer}
        view={currentView as View}
        onView={(newView: View) => setCurrentView(newView as CalendarView)}
        toolbar={false}
      />
    </div>
  );
};

export default BigCalendar;
