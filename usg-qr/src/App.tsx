import React from "react";

import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";

import Routes from "./routes";

import themes from "./themes";

import NavigationScroll from "./layouts/NavigationScroll";
import { useValidateToken } from "./hooks/useValidateToken";
import { roles } from "./store/roles";
import { useAuthorize } from "./hooks/useAuthorize";

function App() {
  
  const customization = useSelector((state: any) => state.customization);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
            <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
    </QueryClientProvider>
  );
}

export default App;
