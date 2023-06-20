import { create } from "zustand";

import { TemporalView } from "./Calendar/Calendar.types";

interface GanttChartControls {
  view: TemporalView;
  changeView: (selectedView: TemporalView) => void;
  scrollEvent: WheelEvent;
  onScroll: (scrollEvent: WheelEvent) => void;
  temporalViewOptions: { label: string; value: string }[];
}

const initialState = {
  view: "yearly" as TemporalView,
  scrollEvent: {} as WheelEvent,
  temporalViewOptions: [
    { value: "monthly", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "yearly", label: "Monthly" },
  ],
};

const useGanttChartControls = create<GanttChartControls>((set, get) => ({
  ...initialState,
  changeView: (selectedView: TemporalView) => set({ view: selectedView }),
  onScroll: (scrollEvent: WheelEvent) => set({ scrollEvent }),
}));

export default useGanttChartControls;
