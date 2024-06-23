import React from "react";
import { momentLocalizer, Event, Calendar } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

interface BigCalendarState {
  events: MyEvent[];
}

export default class BigCalendar extends React.Component<
  BigCalendarProps,
  BigCalendarState
> {
  constructor(props: BigCalendarProps) {
    super(props);
    this.state = {
      events: props.events,
    };
  }

  onEventResize = (data: any) => {
    const { start, end } = data;
    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data: any) => {
    console.log(data);
  };

  render() {
    return (
      <div className="m-2 h-[40vw]">
        <DndCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          toolbar={false}
        />
      </div>
    );
  }
}
