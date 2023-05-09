import { ThemeProvider } from "styled-components";

import "./App.css";
import { engagementlistmockdata } from "./components/GanttChart/engagementlistmockdata";
import { GanttChart } from "./components/GanttChart/GanttChart";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GanttChart projectEngagementData={engagementlistmockdata} />
    </ThemeProvider>
  );
}

export default App;
