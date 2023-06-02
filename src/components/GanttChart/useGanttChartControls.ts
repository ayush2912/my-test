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
  engagementOptions: [
    {
      value: "value 1",
      displayValue: "Feasibility study",
      subValue: "(14 May 2023 - 16 Apr 2024)",
    },
    {
      value: "value 2",
      displayValue: "Registration",
      subValue: "(14 Sep 2023 - 16 Mar 2024)",
    },
    {
      value: "long value",
      displayValue: "Issuance",
      subValue: "(26 Oct 2023- 16 Apr 2024)",
    },
    {
      value: "long value",
      displayValue: "Issuance",
      subValue: "(14 Nov 2023- 15 May 2024)",
    },
  ],
}));

export default useGanttChartControls;
