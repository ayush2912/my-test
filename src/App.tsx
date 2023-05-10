import { ThemeProvider } from "styled-components";
import "./App.css";

import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>This is CCD supply side new project</div>
    </ThemeProvider>
  );
}

export default App;
