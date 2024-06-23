import { create } from "zustand";

type SectionType = "Event" | "Task" | "Appointment";

interface SectionState {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  activeSection: "Event",
  setActiveSection: (section) => set({ activeSection: section }),
}));
