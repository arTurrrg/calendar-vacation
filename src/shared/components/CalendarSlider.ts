import { create } from "zustand";
import moment from "moment";

export type CalendarView = "day" | "week" | "month";

export interface CalendarState {
  currentDate: Date;
  currentMonthLabel: string;
  currentView: CalendarView;
  setCurrentDate: (date: Date) => void;
  navigateDate: (direction: "PREV" | "NEXT") => void;
  setCurrentView: (view: CalendarView) => void;
}

const useCalendarSlider = create<CalendarState>((set) => ({
  currentDate: new Date(),
  currentMonthLabel: moment().format("MMMM YYYY"),
  currentView: "month",
  setCurrentDate: (date: Date) => {
    set((state) => ({
      ...state,
      currentDate: date,
      currentMonthLabel: moment(date).format("MMMM YYYY"),
    }));
  },
  navigateDate: (direction: "PREV" | "NEXT") => {
    set((state) => {
      const newDate = new Date(state.currentDate);
      if (direction === "PREV") {
        newDate.setMonth(state.currentDate.getMonth() - 1);
      } else if (direction === "NEXT") {
        newDate.setMonth(state.currentDate.getMonth() + 1);
      }
      return {
        ...state,
        currentDate: newDate,
        currentMonthLabel: moment(newDate).format("MMMM YYYY"),
      };
    });
  },
  setCurrentView: (view) => {
    set((state) => ({ ...state, currentView: view }));
  },
}));

export default useCalendarSlider;
