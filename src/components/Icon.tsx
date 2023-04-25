import styled, { CSSObject } from "styled-components";

import { ReactComponent as Discontinued } from "@/assets/icons/feedback/discontinued.svg";
import { ReactComponent as InProgressIcon } from "@/assets/icons/feedback/in-progress.svg";
import { ReactComponent as NotStartedIcon } from "@/assets/icons/feedback/not-started.svg";
import { ReactComponent as SuccessIcon } from "@/assets/icons/feedback/success.svg";
import { ReactComponent as FileIcon } from "@/assets/icons/generic/file.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/generic/home.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/generic/message.svg";

interface IconProps {
  size?: number;
  color?: string;
  hoverColor?: string;
}

const svgStyles = ({ size, color, hoverColor }: IconProps): CSSObject => {
  return {
    height: `${size || 24}px`,
    width: `${size || 24}px`,
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
};

export default function Icon({ name }: { name: keyof typeof icons }) {
  const selectedIcon = icons[name];

  const StyledIcon = styled(selectedIcon)<IconProps>`
    ${(props) => svgStyles(props)};
  `;

  return <StyledIcon />;
}
