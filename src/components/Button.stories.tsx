import Button from "./Button";
import Icon from "./Icon";
import Text from "./Text";

export default {
  component: Button,
};

export const PrimarySmall = {
  args: { type: "primary", children: "Click Me", size: "small" },
};
export const PrimaryExtraSmall = {
  args: { type: "primary", children: "Click Me", size: "xsmall" },
};
export const PrimaryLarge = {
  args: { type: "primary", children: "Click Me", size: "large" },
};

export const PrimaryIconExtraSmall = {
  args: {
    type: "primary",
    children: <Icon name="watch" strokeColor="white" size="xsmall" />,
    isIconButton: true,
    size: "xsmall",
  },
};

export const PrimaryIconSmall = {
  args: {
    type: "primary",
    children: <Icon name="watch" strokeColor="white" />,
    isIconButton: true,
    size: "small",
  },
};

export const PrimaryIconLarge = {
  args: {
    type: "primary",
    children: <Icon name="watch" strokeColor="white" />,
    isIconButton: true,
    size: "large",
  },
};

export const PrimaryIconTextSmall = {
  args: {
    type: "primary",
    children: (
      <>
        <Icon name="watch" strokeColor="white" />
        Label
      </>
    ),
    size: "small",
    iconPosition: "left",
  },
};

//Secondary Button
export const SecondaryExtraSmall = {
  args: { type: "secondary", children: "Click Me", size: "xsmall" },
};
export const SecondarySmall = {
  args: { type: "secondary", children: "Click Me", size: "small" },
};
export const SecondaryLarge = {
  args: { type: "secondary", children: "Click Me", size: "large" },
};
export const SecondaryIconExtraSmall = {
  args: {
    type: "secondary",
    children: <Icon name="watch" size="xsmall" />,
    size: "xsmall",
    isIconButton: true,
  },
};
export const SecondaryIconSmall = {
  args: {
    type: "secondary",
    children: <Icon name="watch" />,
    size: "small",
    isIconButton: true,
  },
};
export const SecondaryIconLarge = {
  args: {
    type: "secondary",
    children: <Icon name="watch" />,
    size: "large",
    isIconButton: true,
  },
};

//Ghost Button
export const GhostSmall = {
  args: { type: "ghost", children: "Click Me", size: "small" },
};
export const GhostExtraSmall = {
  args: { type: "ghost", children: "Click Me", size: "xsmall" },
};
export const GhostLarge = {
  args: { type: "ghost", children: "Click Me", size: "large" },
};

export const GhostIconExtraSmall = {
  args: {
    type: "ghost",
    children: <Icon name="watch" size="xsmall" />,
    size: "xsmall",
    isIconButton: true,
  },
};
export const GhostIconSmall = {
  args: {
    type: "ghost",
    children: <Icon name="watch" />,
    size: "small",
    isIconButton: true,
  },
};
export const GhostIconLarge = {
  args: {
    type: "ghost",
    children: <Icon name="watch" />,
    size: "large",
    isIconButton: true,
  },
};

export const SecondaryCustomBorder = {
  args: {
    type: "secondary",
    lightBorderColor: true,
    children: "Click Me",
    size: "small",
  },
};

export const ViewIconButton = {
  args: {
    type: "secondary",
    children: <Icon name="eyeIcon" size="xsmall" />,
    isIconButton: true,
    lightBorderColor: true,
    size: "large",
  },
};
