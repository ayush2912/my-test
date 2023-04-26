import styled, { CSSObject } from "styled-components";

import { ReactComponent as ArrowDown } from "@/assets/icons/arrows/arrow-down.svg";
import { ReactComponent as ArrowLeft } from "@/assets/icons/arrows/arrow-left.svg";
import { ReactComponent as ArrowRight } from "@/assets/icons/arrows/arrow-right.svg";
import { ReactComponent as ArrowUp } from "@/assets/icons/arrows/arrow-up.svg";
import { ReactComponent as CaretDown } from "@/assets/icons/arrows/caret-down.svg";
import { ReactComponent as CaretLeft } from "@/assets/icons/arrows/caret-left.svg";
// import { ReactComponent as CaretRight } from "@/assets/icons/arrows/caret-right.svg";
import { ReactComponent as CaretUp } from "@/assets/icons/arrows/caret-up.svg";
import { ReactComponent as ChevronButtonIcon } from "@/assets/icons/arrows/chevron-button.svg";
import { ReactComponent as ChevronDown } from "@/assets/icons/arrows/chevron-down.svg";
import { ReactComponent as ChevronLeft } from "@/assets/icons/arrows/chevron-left.svg";
import { ReactComponent as ChevronRight } from "@/assets/icons/arrows/chevron-right.svg";
import { ReactComponent as ChevronUp } from "@/assets/icons/arrows/chevron-up.svg";
import { ReactComponent as ChevronsDown } from "@/assets/icons/arrows/chevrons-down.svg";
import { ReactComponent as ChevronsLeft } from "@/assets/icons/arrows/chevrons-left.svg";
import { ReactComponent as ChevronsRight } from "@/assets/icons/arrows/chevrons-right.svg";
import { ReactComponent as ChevronsUp } from "@/assets/icons/arrows/chevrons-up.svg";
import { ReactComponent as Discontinued } from "@/assets/icons/feedback/discontinued.svg";
import { ReactComponent as ErrorIcon } from "@/assets/icons/feedback/error.svg";
import { ReactComponent as InProgressIcon } from "@/assets/icons/feedback/in-progress.svg";
import { ReactComponent as NotStartedIcon } from "@/assets/icons/feedback/not-started.svg";
import { ReactComponent as SuccessIcon } from "@/assets/icons/feedback/success.svg";
import { ReactComponent as WaitingFeedBackIcon } from "@/assets/icons/feedback/waiting.svg";
import { ReactComponent as AustraliaFlagIcon } from "@/assets/icons/flags/australia.svg";
import { ReactComponent as BrazilFlagIcon } from "@/assets/icons/flags/brazil.svg";
import { ReactComponent as CanadaFlagIcon } from "@/assets/icons/flags/canada.svg";
import { ReactComponent as ChinaFlagIcon } from "@/assets/icons/flags/china.svg";
import { ReactComponent as ColumbiaFlagIcon } from "@/assets/icons/flags/columbia.svg";
import { ReactComponent as FranceFlagIcon } from "@/assets/icons/flags/france.svg";
import { ReactComponent as GermanyFlagIcon } from "@/assets/icons/flags/germany.svg";
import { ReactComponent as IndiaFlagIcon } from "@/assets/icons/flags/india.svg";
import { ReactComponent as RussiaFlagIcon } from "@/assets/icons/flags/russia.svg";
import { ReactComponent as SpainFlagIcon } from "@/assets/icons/flags/spain.svg";
import { ReactComponent as UnitedKingdomFlagIcon } from "@/assets/icons/flags/united-kingdom.svg";
import { ReactComponent as UnitedStatesFlagIcon } from "@/assets/icons/flags/united-states.svg";
// import { ReactComponent as AlertNoticationIcon } from "@/assets/icons/generic/alert-notication.svg";
import { ReactComponent as AlertIcon } from "@/assets/icons/generic/alert.svg";
import { ReactComponent as CalendarTimeIcon } from "@/assets/icons/generic/calendar-time.svg";
import { ReactComponent as CalendarIcon } from "@/assets/icons/generic/calendar.svg";
import { ReactComponent as ChartIcon } from "@/assets/icons/generic/chart.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/generic/close.svg";
import { ReactComponent as DotsIcon } from "@/assets/icons/generic/dots.svg";
import { ReactComponent as DownloadIcon } from "@/assets/icons/generic/download.svg";
import { ReactComponent as EditIcon } from "@/assets/icons/generic/edit.svg";
import { ReactComponent as EyeOffIcon } from "@/assets/icons/generic/eye-Off.svg";
import { ReactComponent as EyeIcon } from "@/assets/icons/generic/eye.svg";
import { ReactComponent as FilePdfIcon } from "@/assets/icons/generic/file-pdf.svg";
import { ReactComponent as FileIcon } from "@/assets/icons/generic/file.svg";
import { ReactComponent as FiltersIcon } from "@/assets/icons/generic/filters.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/generic/home.svg";
import { ReactComponent as InformationIcon } from "@/assets/icons/generic/information.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/generic/message.svg";
import { ReactComponent as MinusIcon } from "@/assets/icons/generic/minus.svg";
import { ReactComponent as MoneyIcon } from "@/assets/icons/generic/money.svg";
import { ReactComponent as PlaceholderIcon } from "@/assets/icons/generic/placeholder.svg";
import { ReactComponent as PlusIcon } from "@/assets/icons/generic/plus.svg";
import { ReactComponent as PriceVariationIcon } from "@/assets/icons/generic/price-variation.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/generic/search.svg";
import { ReactComponent as SendIcon } from "@/assets/icons/generic/send.svg";
import { ReactComponent as SettingsIcon } from "@/assets/icons/generic/settings.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/generic/trash.svg";
import { ReactComponent as UnarchiveIcon } from "@/assets/icons/generic/unarchive.svg";
import { ReactComponent as UploadIcon } from "@/assets/icons/generic/upload.svg";
import { ReactComponent as WaitingIcon } from "@/assets/icons/generic/waiting.svg";
import { ReactComponent as BidsIcon } from "@/assets/icons/menu/bids.svg";
import { ReactComponent as ProjectsIcon } from "@/assets/icons/menu/projects.svg";
import { ReactComponent as UserManagementIcon } from "@/assets/icons/menu/user-management.svg";
interface IconProps {
  size?: "small" | "big";
  color?: string;
  hoverColor?: string;
}

const svgStyles = ({ size, color, hoverColor }: IconProps): CSSObject => {
  return {
    height: `${size === "small" ? 18 : 24}px`,
    width: `${size === "small" ? 18 : 24}px`,
    "& path": {
      stroke: color,
    },
    "&:hover path": {
      stroke: hoverColor,
    },
  };
};

const icons = {
  australiaFlag: AustraliaFlagIcon,
  brazilFlag: BrazilFlagIcon,
  canadaFlag: CanadaFlagIcon,
  chinaFlag: ChinaFlagIcon,
  columbiaFlag: ColumbiaFlagIcon,
  franceFlag: FranceFlagIcon,
  germanyFlag: GermanyFlagIcon,
  indiaFlag: IndiaFlagIcon,
  russiaFlag: RussiaFlagIcon,
  spainFlag: SpainFlagIcon,
  unitedKingdomFlag: UnitedKingdomFlagIcon,
  unitedStatesFlag: UnitedStatesFlagIcon,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  caretDown: CaretDown,
  caretLeft: CaretLeft,
  // caretRight: CaretRight,
  caretUp: CaretUp,
  chevronButton: ChevronButtonIcon,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronsDown: ChevronsDown,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chevronsUp: ChevronsUp,
  home: HomeIcon,
  success: SuccessIcon,
  message: MessageIcon,
  file: FileIcon,
  notStarted: NotStartedIcon,
  inProgress: InProgressIcon,
  discontinued: Discontinued,
  error: ErrorIcon,
  waitingFeedback: WaitingFeedBackIcon,
  // alertNotication: AlertNoticationIcon,
  alert: AlertIcon,
  calendarTime: CalendarTimeIcon,
  calendar: CalendarIcon,
  chart: ChartIcon,
  close: CloseIcon,
  dots: DotsIcon,
  download: DownloadIcon,
  edit: EditIcon,
  eyeOff: EyeOffIcon,
  eye: EyeIcon,
  filePdf: FilePdfIcon,
  filters: FiltersIcon,
  information: InformationIcon,
  minus: MinusIcon,
  money: MoneyIcon,
  placeholder: PlaceholderIcon,
  plus: PlusIcon,
  priceVariation: PriceVariationIcon,
  search: SearchIcon,
  send: SendIcon,
  settings: SettingsIcon,
  trash: TrashIcon,
  unarchive: UnarchiveIcon,
  upload: UploadIcon,
  waiting: WaitingIcon,
  bids: BidsIcon,
  projects: ProjectsIcon,
  userManagement: UserManagementIcon,
};
export const IconNames = Object.keys(icons) as Array<IconNameType>;
export type IconNameType = keyof typeof icons;

const StyledIcon = styled.svg<IconProps>`
  ${(props) => svgStyles(props)};
`;

export default function Icon({
  name,
  size,
}: {
  name: IconNameType;
  size?: "small" | "big";
}) {
  const SelectedIcon = icons[name];

  return <StyledIcon as={SelectedIcon} size={size} />;
}
