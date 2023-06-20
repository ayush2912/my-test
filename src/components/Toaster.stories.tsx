import Toaster from "./Toaster";

export default {
  component: Toaster,
};

export const PrimarySmall = {
  args: {
    title: "primary",
    subTitle: "Click Me",
    type: "success",
    onDismiss: () => console.log("hello"),
  },
};
