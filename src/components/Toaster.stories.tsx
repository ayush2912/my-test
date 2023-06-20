import Toaster from "./Toaster";

export default {
  component: Toaster,
};

export const Success = {
  args: {
    title: "Message",
    type: "success",
    onDismiss: () => console.log("close"),
  },
};

export const SuccessWithDescription = {
  args: {
    title: "Message",
    subTitle: "Description",
    type: "success",
    onDismiss: () => console.log("close"),
  },
};

export const Warning = {
  args: {
    title: "Message",
    type: "warning",
    onDismiss: () => console.log("close"),
  },
};

export const WarningWithDescription = {
  args: {
    title: "Message",
    subTitle: "Description",
    type: "warning",
    onDismiss: () => console.log("close"),
  },
};

export const Error = {
  args: {
    title: "Message",
    type: "error",
    onDismiss: () => console.log("close"),
  },
};

export const ErrorWithDescription = {
  args: {
    title: "Message",
    subTitle: "Description",
    type: "error",
    onDismiss: () => console.log("close"),
  },
};

export const Information = {
  args: {
    title: "Message",
    type: "information",
    onDismiss: () => console.log("close"),
  },
};

export const InformationWithDescription = {
  args: {
    title: "Message",
    subTitle: "Description",
    type: "information",
    onDismiss: () => console.log("close"),
  },
};
