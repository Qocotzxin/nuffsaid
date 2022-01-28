import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Main } from "./components/features";
import { MessageProvider } from "./contexts/MessagesContext";

const App: React.FC<{}> = () => {
  return (
    <MessageProvider>
      <CssBaseline />
      <Main />
    </MessageProvider>
  );
};

export default App;
