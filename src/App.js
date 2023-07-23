
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import React, { useMemo,useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getDesignTokens from "./styles/MyTheme";
import { Box, CssBaseline } from "@mui/material";



function App() {

  const [mode, setmyMOde] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
     // errorElement: <Page404 />
    },
    {
      path: "/home",
      element: <Home {...{setmyMOde}}/>,
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
    
  ]);
  return(

    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box><RouterProvider router={router} /></Box>
    </ThemeProvider>
  )
}

export default App;
