import { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";

import NewTooltip from "./components/newTooltip";
import { theme } from "./styles/theme";

function App() {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef(null);
  return (
    <ThemeProvider theme={theme}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>
        This is CCD new project
        <div
          style={{
            height: "100px",
            width: "200px",
            backgroundColor: "green",
            margin: "0 auto",
            marginTop: "12rem",
          }}
        >
          <button
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            ref={triggerRef}
            style={{ margin: "0rem" }}
          >
            Hover me
          </button>
        </div>
        <NewTooltip
          data={"This is toiltip"}
          visible={visible}
          ref={triggerRef}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
