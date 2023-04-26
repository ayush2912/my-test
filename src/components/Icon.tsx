import styled, { CSSObject } from "styled-components";

import { ReactComponent as ChevronButtonIcon } from "@/assets/icons/arrows/chevron-button.svg";
import { ReactComponent as Discontinued } from "@/assets/icons/feedback/discontinued.svg";
import { ReactComponent as InProgressIcon } from "@/assets/icons/feedback/in-progress.svg";
import { ReactComponent as NotStartedIcon } from "@/assets/icons/feedback/not-started.svg";
import { ReactComponent as SuccessIcon } from "@/assets/icons/feedback/success.svg";
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
  home: HomeIcon,
  success: SuccessIcon,
  message: MessageIcon,
  file: FileIcon,
  notStarted: NotStartedIcon,
  inProgress: InProgressIcon,
  discontinued: Discontinued,
  chevronButton: ChevronButtonIcon,
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
};
export const IconNames = Object.keys(icons) as Array<IconNameType>;
export type IconNameType = keyof typeof icons;

export default function Icon({
  name,
  size,
}: {
  name: IconNameType;
  size?: "small" | "big";
}) {
  const selectedIcon = icons[name];

  const StyledIcon = styled(selectedIcon)<IconProps>`
    ${(props) => svgStyles(props)};
  `;

  return <StyledIcon size={size} />;
}
