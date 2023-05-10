import { create } from "zustand";

import { TemporalView } from "./Calendar/Calendar.type";

interface GanttChartControls {
  view: TemporalView;
  changeView: (selectedView: TemporalView) => void;
}

const useGanttChartControls = create<GanttChartControls>((set) => ({
  view: "monthly",
  changeView: (selectedView: TemporalView) => set({ view: selectedView }),
}));

export default useGanttChartControls;
