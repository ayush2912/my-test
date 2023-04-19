import styled, { ThemeProvider } from "styled-components";

import "./App.css";
import { theme } from "./styles/theme";

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  font-size: ${(props) => props.theme.typography.button.size}px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Button>hello</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
