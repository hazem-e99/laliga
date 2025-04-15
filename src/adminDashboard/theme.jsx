export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#1976d2", // Blue for light mode
          },
          secondary: {
            main: "#f50057", // Pink for light mode
          },
          background: {
            default: "#f4f6f8", // Light gray background instead of pure white
            paper: "#ffffff", // Paper can remain white or use a very light shade
          },
          text: {
            primary: "#000000", // Dark text for light mode
            secondary: "#555555", // Slightly lighter text
          },
        }
      : {
          primary: {
            main: "#bb86fc", // Light purple for dark mode
          },
          secondary: {
            main: "#03dac6", // Light teal for dark mode
          },
          background: {
            default: "#121212", // Dark background
            paper: "#1f1f1f", // Dark paper background
          },
          text: {
            primary: "#ffffff", // Light text for dark mode
            secondary: "#e0e0e0", // Slightly lighter text
          },
        }),
  },
});
