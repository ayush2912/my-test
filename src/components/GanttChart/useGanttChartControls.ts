import { create } from "zustand";

import { TemporalView } from "./Calendar/Calendar.types";
import { IMappedEngagement } from "./GanttChart.types";
import { convertToMonthNameFormat } from "../../utils/dateTimeFormatter";
import { ISelectOption } from "../Select";

interface GanttChartControls {
  view: TemporalView;
  changeView: (selectedView: TemporalView) => void;
  scrollEvent: WheelEvent;
  onScroll: (scrollEvent: WheelEvent) => void;
  temporalViewOptions: { label: string; value: string }[];
  engagements: IMappedEngagement[];
  setEngagements: (engagements: IMappedEngagement[]) => void;
  engagementOptions: ISelectOption[];
  setEngagementOptions: (engagementOptions: ISelectOption[]) => void;
  selectedEngagement: IMappedEngagement;
  setSelectedEngagement: (selectedEngagementId: string) => void;
}

const useGanttChartControls = create<GanttChartControls>((set, get) => ({
  view: "yearly",
  changeView: (selectedView: TemporalView) => set({ view: selectedView }),
  scrollEvent: {} as WheelEvent,
  onScroll: (scrollEvent: WheelEvent) => set({ scrollEvent }),
  temporalViewOptions: [
    { value: "monthly", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "yearly", label: "Monthly" },
  ],
  engagements: [] as IMappedEngagement[],
  setEngagementOptions: (engagementOptions: ISelectOption[]) =>
    set({ engagementOptions }),
  engagementOptions: [],
  selectedEngagement: {} as IMappedEngagement,
  setSelectedEngagement: (selectedEngagementId: string) => {
    set({
      selectedEngagement: get().engagements.find(
        (v) => v.id === selectedEngagementId,
      ),
    });
  },
  setEngagements: (engagements: IMappedEngagement[]) => {
    const engagementOptions = engagements.map((v) => ({
      value: v.id,
      label: v.type,
      sublabel: `(${convertToMonthNameFormat(
        v.startDate,
      )} - ${convertToMonthNameFormat(v.dueDate)})`,
    }));
    if (engagements.length) set({ selectedEngagement: engagements[0] });
    set({ engagements, engagementOptions });
  },
}));

export default useGanttChartControls;
