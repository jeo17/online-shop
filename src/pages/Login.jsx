import React from "react";
import "./Login.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { grey, blue } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SvgIcon from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth, provider, provider2 } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import Typography from "@mui/material/Typography";
import { AddBox } from "@mui/icons-material";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const GoogleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    "&:hover": {
      backgroundColor: grey[500],
    },
  }));
  const FacebookButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#1877f2"),
    backgroundColor: "#1877f2",
    "&:hover": {
      backgroundColor: blue[900],
    },
  }));
  const AdminButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#000"),
    backgroundColor: "#000",
    "&:hover": {
      backgroundColor: grey[900],
    },
  }));

  useEffect(() => {
    if (user && !loading) {
      navigate("/home");
    }
  });

  if (loading) {
  }

  if (!user && !loading) {
    return (
      <Box
        className="login"
        sx={{
          backgroundPositionX: {
            xs: "unset",
            md: "550px",
          },
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
        }}
      >
        <Box className="left-design">
          <Box
            className="buttons"
            sx={{
              left: { xs: "unset", md: "10%" },
              transform: { xs: "scale(0.7)", sm: "scale(1)" },
              marginBottom: { xs: "50vh", sm: "unset" },
            }}
          >
            <Stack spacing={4} direction="column">
              <GoogleButton
                onClick={(eo) => {
                  signInWithPopup(auth, provider)
                    .then((result) => {
                      const user = result.user;

                      navigate("/home");
                      console.log(user);
                    })
                    .catch((error) => {
                      // Handle Errors here.
                      const errorCode = error.code;
                      console.log(errorCode);
                    });
                }}
                size="large"
                variant="contained"
                sx={{ color: "#545454", borderRadius: "8px" }}
              >
                <SvgIcon sx={{ marginRight: "8px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="48px"
                    height="48px"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                </SvgIcon>
                Sign in with google
              </GoogleButton>
              <FacebookButton
                onClick={(eo) => {
                  signInWithPopup(auth, provider2)
                    .then((result) => {
                      const user = result.user;

                      navigate("/home");
                      console.log(user);
                    })
                    .catch((error) => {
                      // Handle Errors here.
                      const errorCode = error.code;
                      console.log(errorCode);
                    });
                }}
                sx={{ borderRadius: "8px" }}
                size="large"
                variant="contained"
                href="#text-buttons"
                startIcon={<FacebookIcon />}
              >
                Sign in with facebook
              </FacebookButton>
              <AdminButton
                sx={{ borderRadius: "8px" }}
                size="large"
                variant="contained"
                href="#text-buttons"
                startIcon={<AccountCircleIcon />}
                onClick={(eo) => {
                  navigate("./admin-login");
                }}
              >
                Admin Sign in
              </AdminButton>
            </Stack>
          </Box>
        </Box>

        <Box className="right-design">
          <Box className="Hamo-store"  variant="body1" color="white" sx={{scale: {  xs: "0.5",   sm: "0.8", md: "1" },transform: {  xs: "translate(0px,0px)" , md: "translate(-43px,20px)" }}}>


          <Typography variant="body1" sx={{display:"flex"}}>

          <Typography variant="body1" className="hamo" >HaM</Typography>
          <Typography variant="body1" className="hamo" color="#ffce08">1</Typography>
          <Typography variant="body1" className="hamo" >0</Typography>

          </Typography>





          
         <Typography variant="body1" className="store" >00StO9E</Typography> 
          </Box>
        </Box>
      </Box>
    );
  }
};

export default Login;
