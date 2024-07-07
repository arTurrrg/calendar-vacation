import { Calendar } from "@/components/ui/calendar";
import BigCalendar from "@/shared/components/BigCalendar";
import * as React from "react";

import "@/shared/styles.scss";
import CreateButton from "@/shared/components/CreateButton";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <CreateButton />
      <div className="calendar-container">
        <Calendar
          mode="single"
          className="mt-3"
          classNames={{
            day_selected:
              "bg-slate-900 text-white hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white dark:bg-slate-900 dark:text-white dark:hover:bg-slate-900 dark:hover:text-white dark:focus:bg-slate-900 dark:focus:text-white",
          }}
          selected={date}
          onSelect={setDate}
          fixedWeeks
        />
        <BigCalendar events={[]} />
      </div>
    </div>
  );
}
