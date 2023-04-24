import styled, { ThemeProvider } from "styled-components";

import "./App.css";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">This is CCD new project</div>
    </ThemeProvider>
  );
}

export default App;
