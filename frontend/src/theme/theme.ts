import { alpha, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: "#00E5FF",
    },
    background: {
      default: "#070B14",
      paper: "#111827",
    },
    success: {
      main: "#22c55e",
    },
    warning: {
      main: "#f59e0b",
    },
    error: {
      main: "#ef4444",
    },
    info: {
      main: "#38bdf8",
    },
    text: {
      primary: "#E5ECF6",
      secondary: "#9FB0CC",
    },
    divider: alpha("#8AA4FF", 0.15),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.75rem)" },
    h2: { fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 3rem)" },
    h3: { fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)" },
    h4: { fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 2rem)" },
    h5: { fontWeight: 700, fontSize: "clamp(1.15rem, 2vw, 1.5rem)" },
    h6: { fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.25rem)" },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha("#8AA4FF", 0.12)}`,
          background: `linear-gradient(180deg, ${alpha(
            "#0f172a",
            0.92
          )} 0%, ${alpha("#111827", 0.88)} 100%)`,
          backdropFilter: "blur(18px)",
          boxShadow: `0 10px 40px ${alpha("#000", 0.32)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 18,
          minHeight: 44,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: alpha("#0B1220", 0.7),
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: "100%",
          margin: 16,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});