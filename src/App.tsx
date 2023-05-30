import { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>
        This is CCD new project
      </div>
    </ThemeProvider>
  );
}

export default App;
