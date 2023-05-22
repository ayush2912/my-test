import styled, { CSSObject } from "styled-components";

import { ReactComponent as ChevronButtonIcon } from "../assets/icons/arrows/chevron-button.svg";
import { ReactComponent as ChevronDownIcon } from "../assets/icons/arrows/chevron-down.svg";
import { ReactComponent as Discontinued } from "../assets/icons/feedback/discontinued.svg";
import { ReactComponent as InProgressIcon } from "../assets/icons/feedback/in-progress.svg";
import { ReactComponent as NotStartedIcon } from "../assets/icons/feedback/not-started.svg";
import { ReactComponent as SuccessIcon } from "../assets/icons/feedback/success.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/generic/eyeIcon.svg";
import { ReactComponent as FileIcon } from "../assets/icons/generic/file.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/generic/home.svg";
import { ReactComponent as InformationIcon } from "../assets/icons/generic/information.svg";
import { ReactComponent as MessageIcon } from "../assets/icons/generic/message.svg";

interface IconProps {
  size: "xsmall" | "small" | "big";
  color?: string;
  hoverColor?: string;
  strokecolor?: string;
}

const svgStyles = ({
  size,
  color,
  hoverColor,
  strokecolor,
}: IconProps): CSSObject => {
  return {
    height: `${{ xsmall: 16, small: 24, big: 40 }[size]}px`,
    width: `${{ xsmall: 16, small: 24, big: 40 }[size]}px`,
    "& path": {
      stroke: strokecolor,
      fill: color,
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
  eyeIcon: EyeIcon,
  notStarted: NotStartedIcon,
  inProgress: InProgressIcon,
  discontinued: Discontinued,
  chevronButton: ChevronButtonIcon,
  chevronDown: ChevronDownIcon,
  information: InformationIcon,
};

export type IconNameType = keyof typeof icons;

const StyledIcon = styled.svg<IconProps>`
  ${(props) => svgStyles(props)};
`;

export default function Icon({
  name,
  size = "small",
  color,
  strokeColor,
}: {
  name: IconNameType;
  size?: "xsmall" | "small" | "big";
  color?: string;
  strokeColor?: string;
}) {
  const SelectedIcon = icons[name];

  return (
    <StyledIcon
      as={SelectedIcon}
      size={size}
      color={color}
      strokecolor={strokeColor}
    />
  );
}
