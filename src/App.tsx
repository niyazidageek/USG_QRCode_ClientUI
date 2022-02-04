import React from "react";

import { useSelector } from "react-redux";
import { positions, Provider } from "react-alert";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";

import Routes from "./routes";

import themes from "./themes";

import NavigationScroll from "./layouts/NavigationScroll";

import AlertTemplate from "./components/alert/AlertTemplate";

function App() {
  const customization = useSelector((state: any) => state.customization);
  const queryClient = new QueryClient();
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_RIGHT,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider template={AlertTemplate} {...options}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes(customization)}>
            <CssBaseline />
            <NavigationScroll>
              <Routes />
            </NavigationScroll>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
