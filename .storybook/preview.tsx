import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/styles/theme";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ margin: "16px", fontFamily: "Open Sans" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
