import { create } from "zustand";

import { TemporalView } from "./Calendar/Calendar.types";

interface GanttChartControls {
  view: TemporalView;
  changeView: (selectedView: TemporalView) => void;
}

const useGanttChartControls = create<GanttChartControls>((set) => ({
  view: "yearly",
  changeView: (selectedView: TemporalView) => set({ view: selectedView }),
}));

export default useGanttChartControls;
