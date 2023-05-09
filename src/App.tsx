import { useState } from "react";
import { ThemeProvider } from "styled-components";

import "./App.css";
import Dropdown from "./components/Dropdown";
import { GanttChart } from "./components/GanttChart/GanttChart";
import { theme } from "./styles/theme";

const options = [
  { value: "monthly", label: "monthly" },
  { value: "yearly", label: "yearly" },
  { value: "weekly", label: "weekly" },
];

function App() {
  const [selectedOption, setSelectedOption] = useState<
    "yearly" | "monthly" | "weekly"
  >("monthly");

  const handleDropdownChange = (value: "yearly" | "monthly" | "weekly") => {
    setSelectedOption(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "500px" }}>
        <Dropdown
          options={options}
          value={selectedOption}
          onChange={handleDropdownChange}
        />
      </div>

      <GanttChart selectedOption={selectedOption} />
    </ThemeProvider>
  );
}

export default App;
