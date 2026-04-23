import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { useTheme } from "./ThemeContext";

/**
 * MUI Integration Provider.
 * This ensures MUI components follow the project's Teal & Saffron palette
 * and respect the Light/Dark mode toggle.
 */
export function MUIProvider({ children }) {
  const { theme: mode } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#0D9488", // Teal Green
      },
      secondary: {
        main: "#F97316", // Saffron Orange
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
