import { create } from "zustand";

import { TemporalView } from "./Calendar/Calendar.types";

interface GanttChartControls {
  view: TemporalView;
  changeView: (selectedView: TemporalView) => void;
  scrollEvent: WheelEvent;
  onScroll: (scrollEvent: WheelEvent) => void;
  temporalViewOptions: { label: string; value: string }[];
  engagementOptions: {
    value: string;
    displayValue: string;
    subValue: string;
  }[];
  setEngagementOptions: (
    engagementOptions: {
      value: string;
      displayValue: string;
      subValue: string;
    }[],
  ) => void;
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
  setEngagementOptions: (
    engagementOptions: {
      value: string;
      displayValue: string;
      subValue: string;
    }[],
  ) => set({ engagementOptions }),
  engagementOptions: [],
}));

export default useGanttChartControls;
