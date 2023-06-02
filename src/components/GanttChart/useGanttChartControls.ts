import { create } from "zustand";

import { TemporalView } from "./Calendar/Calendar.types";

interface GanttChartControls {
  view: TemporalView;
  changeView: (selectedView: TemporalView) => void;
  scrollEvent: WheelEvent;
  onScroll: (scrollEvent: WheelEvent) => void;
  temporalViewOptions: { label: string; value: string }[];
}

const useGanttChartControls = create<GanttChartControls>((set) => ({
  view: "yearly",
  changeView: (selectedView: TemporalView) => set({ view: selectedView }),
  scrollEvent: {} as WheelEvent,
  onScroll: (scrollEvent: WheelEvent) => set({ scrollEvent }),
  temporalViewOptions: [
    { value: "monthly", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "yearly", label: "Monthly" },
  ],
}));

export default useGanttChartControls;
