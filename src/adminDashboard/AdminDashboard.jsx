import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "../adminDashboard/components/TopBar";
import SideBar from "../adminDashboard/components/SideBar";
import { getDesignTokens } from "../adminDashboard/theme";
import { Outlet } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function AdminDashboard() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(
    localStorage.getItem("currentMode") || "light"
  );
  
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          setMode={setMode}
        />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />

        <Box component="main" sx={{ 
          flexGrow: 1, 
          p: 3,
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh'
        }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}