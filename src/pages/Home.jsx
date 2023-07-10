import * as React from "react";
import "./Home.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import SvgIcon from "@mui/material/SvgIcon";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";
import AddPic from "./component/AddPic";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import { useTheme } from '@mui/material';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

import { useNavigate } from "react-router-dom";






const pages = [
  {
    Name: "Home",
    endIcon: "",
    startIcon: <HomeIcon />,
  },
  {
    Name: "Contact",
    endIcon: <ContactsIcon />,
    startIcon: "",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const imgSettings = [
  {
    Name: "Edit",
    icon: <ModeEditTwoToneIcon />,
  },
  {
    Name: "Delete",
    icon: <DeleteOutlineRoundedIcon /> ,
  },
];

const Home = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setanchorEl] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenMenu = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseMenu = () => {
    setanchorEl(null);
  };


  
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.Name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.Name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.Name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    padding: "6px 13px",
                    display: "flex",
                  }}
                  endIcon={page.endIcon}
                  startIcon={page.startIcon}
                >
                  {page.Name}
                </Button>
              ))}

              <Button
                onMouseEnter={(eo) => {
                  setOpen(true);
                }}
                onMouseLeave={(eo) => {
                  if (eo.target.id !== "categories") {
                    setOpen(false);
                  }
                }}
                sx={{
                  my: 2,
                  color: "white",
                  padding: "6px 13px",
                  display: "flex",
                  mt: 0,
                  mb: 0,
                }}
              >
                <ListItemButton>
                  <ListItemText primary="Categories" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List
                    id="categories"
                    component="div"
                    disablePadding
                    sx={{
                      position: "absolute",
                      backgroundColor: "rgba(234 ,234, 234 ,0.85)",
                      left: "17px",
                      top: "70px",
                      display: "flex",
                      zIndex: "2",
                    }}
                    onMouseLeave={() => {
                      setOpen(false);
                    }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#228BE6"
                            viewBox="0 0 50 50"
                            width="50px"
                            height="50px"
                          >
                            {" "}
                            <path d="M 25 2 C 20.709 2 16.618563 3.2007813 13.226562 5.3007812 C 13.007563 5.3737813 12.629156 5.6617969 12.285156 5.9667969 C 15.330156 3.5477969 22.371734 8.3929375 24.427734 9.8359375 C 24.773734 10.078938 25.228219 10.078938 25.574219 9.8359375 C 27.630219 8.3929375 34.671797 3.5467969 37.716797 5.9667969 C 37.372797 5.6617969 36.993391 5.3737813 36.775391 5.3007812 C 33.382391 3.2007813 29.291 2 25 2 z M 11 8 C 9.403 8 8.2363281 9.3007812 8.2363281 9.3007812 C 4.4443281 13.400781 2.0507812 18.9 2.0507812 25 C 2.0507812 37.7 12.328 48 25 48 C 31.685 48 37.771891 45.1 41.962891 40.5 C 41.962891 40.5 41.464094 37.499609 38.371094 33.099609 C 34.912094 27.882609 27.905109 21.311922 25.662109 19.294922 C 25.279109 18.950922 24.708125 18.952781 24.328125 19.300781 C 22.638125 20.847781 18.277406 25.177781 17.316406 26.300781 C 15.021406 28.700781 8.6353281 36.299609 8.2363281 40.599609 C 8.2363281 40.599609 6.8386406 37.200391 9.9316406 29.400391 C 11.856641 24.714391 17.835375 17.747984 20.734375 14.708984 C 21.119375 14.305984 21.110125 13.669109 20.703125 13.287109 C 19.743125 12.388109 17.505281 10.812609 15.488281 9.5996094 C 14.092281 8.6996094 12.497 8.1 11 8 z M 38.689453 8 C 38.036453 8 33.794078 9.3428281 29.330078 13.298828 C 28.908078 13.672828 28.891203 14.325469 29.283203 14.730469 C 30.900203 16.401469 35.322656 20.681391 37.972656 24.900391 C 41.265656 30.300391 43.2605 34.6 42.0625 40.5 C 45.7545 36.4 48.050781 31 48.050781 25 C 47.950781 19 45.655281 13.500391 41.863281 9.4003906 C 41.763281 9.3003906 41.663453 9.1996094 41.564453 9.0996094 C 40.766453 8.1996094 39.587453 8 38.689453 8 z" />
                          </svg>
                        </SvgIcon>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#228BE6"
                            viewBox="0 0 30 30"
                            width="60px"
                            height="60px"
                          >
                            {" "}
                            <path d="M 11.181641 3.7421875 L 11.181641 24.857422 L 15.761719 26.257812 L 15.761719 8.5761719 C 15.761719 8.0671719 15.761625 7.8135937 16.015625 7.5585938 C 16.142625 7.3045937 16.396391 7.3046406 16.650391 7.4316406 C 17.286391 7.6856406 17.669922 8.1948906 17.669922 9.2128906 L 17.669922 16.207031 C 19.195922 16.970031 20.466375 16.970031 21.484375 16.207031 C 22.502375 15.444031 23.011719 14.300578 23.011719 12.392578 C 23.012719 10.357578 22.630234 9.0853594 21.740234 8.0683594 C 20.977234 7.0503594 19.578969 6.1594375 17.542969 5.5234375 C 14.998969 4.7604375 12.835641 4.1241875 11.181641 3.7421875 z M 9.9101562 16.972656 L 4.0585938 19.007812 L 3.1699219 19.388672 C 1.7709219 20.024672 1.0078125 20.660875 1.0078125 21.296875 C 1.1348125 22.059875 1.388875 23.078844 3.296875 23.714844 C 5.077875 24.350844 6.4770625 24.604891 10.039062 23.587891 L 10.039062 21.296875 C 6.6030625 22.440875 6.0949375 22.314547 5.5859375 22.060547 C 5.0769375 21.806547 5.076125 21.550828 5.203125 21.423828 C 5.585125 21.169828 6.984375 20.660156 6.984375 20.660156 L 9.9101562 19.642578 L 9.9101562 16.972656 z M 22.853516 17.962891 C 22.440109 17.948984 22.026781 17.956531 21.613281 17.988281 C 20.214281 17.988281 18.941063 18.243 17.414062 18.625 L 17.414062 21.296875 L 20.212891 20.277344 L 21.738281 19.769531 C 21.738281 19.769531 22.375812 19.642625 22.757812 19.515625 C 23.393812 19.388625 24.15625 19.642578 24.15625 19.642578 C 24.53825 19.642578 24.792969 19.768438 24.792969 20.023438 C 24.919969 20.277438 24.665297 20.406156 24.029297 20.660156 L 22.630859 21.169922 L 17.542969 23.076172 L 17.542969 25.748047 L 19.832031 24.984375 L 26.191406 22.695312 L 26.955078 22.3125 C 28.481078 21.8035 29.117234 21.167297 28.990234 20.404297 C 28.990234 19.642297 28.100219 19.134 26.574219 18.625 C 25.333719 18.24325 24.093734 18.004609 22.853516 17.962891 z" />
                          </svg>
                        </SvgIcon>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>
                        <SvgIcon>
                          <svg
                            className="change-my-color"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 435 370"
                          >
                            <g data-name="PSP">
                              <path d="M350.675 161.397H161.32a94.603 94.603 0 0 0 0 189.206h189.35a94.603 94.603 0 1 0 .005-189.206zm0 169.1H161.32a74.495 74.495 0 0 1 0-148.989h189.35a74.495 74.495 0 1 1 .005 148.99z" />
                              <path d="M156.013 321.356h199.974V190.644H156.013zM176.12 210.75h159.757v90.495H176.12zM130.315 229.986h-20.106v14.846H95.368v20.111h14.841v14.845h20.106v-14.845h14.85v-20.111h-14.85v-14.846zM382.49 224.211a13.66 13.66 0 1 1-13.664 13.663 13.661 13.661 0 0 1 13.663-13.663zM382.49 259.425a13.658 13.658 0 1 1-13.664 13.663 13.658 13.658 0 0 1 13.663-13.663z" />
                            </g>
                          </svg>
                        </SvgIcon>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                </Collapse>
              </Button>


              
              <Button>

                <ListItemButton>
                  <ListItemText primary={<AddPic />} />
                </ListItemButton>
                    
              </Button>

            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={(eo) => {
                    handleCloseUserMenu();
                    if (setting === "Logout") {
                     
                        signOut(auth).then(() => {
                          console.log("signout succ")
                          navigate("/")
                        }).catch((error) => {
                          console.log(error)
                        });
                        
                    
        
                    }
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ImageList
        sx={{
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          gridTemplateColumns: { xs: "repeat(2, 1fr) !important", sm: "repeat(3, 1fr) !important" },
          margin: "6px 0 0 0",
          gap: "6px !important",
        }}
        
      >
        {itemData.map((item,index) => (
          <ImageListItem key={item.img} sx={{height:"480px !important"}}>

                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <MoreVertIcon className="moreVert"/>
                </IconButton>


                <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                {imgSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseMenu}>
                    <Typography textAlign="center" sx={{display:"flex",alignItems:"center",color:setting.Name ==="Delete"? `${theme.palette.error.main}` :"none"}}>{setting.icon} &nbsp; {setting.Name}</Typography>
                  </MenuItem>
                ))}
              </Menu>


            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              id={`1-img-bar-${index}`}
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton onClick={(eo) => {
                  document.getElementById(`2-img-bar-${index}`).style.display = "flex";
                  document.getElementById(`1-img-bar-${index}`).style.display = "none";
                }}
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />

<ImageListItemBar 
              id={`2-img-bar-${index}`}
              sx={{display:"none"}}
              title={item.info} 
              actionIcon={
                <IconButton  onClick={(eo) => {
                  document.getElementById(`2-img-bar-${index}`).style.display = "none";
                  document.getElementById(`1-img-bar-${index}`).style.display = "flex";
                }}
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
          
        ))}
      </ImageList>
    </div>
  );
};

const itemData = [
  {
    img: "https://microless.com/cdn/products/953a385778a4218a589079c9422cd85d-md.jpg",
    title: "xbox-360",
    author: "@bkristastucchio",
    info:"etat: 10/10 --  avec 5 cd -- maglitch w maflachi",
    id:"1",
  },
  {
    img: "https://cdn7.ouedkniss.com/1600/medias/announcements/images/kZ5mx/tlpxsaTe09mQkQH1yAfUF8gSaAodGWNjsbP5Fgmp.jpg",
    title: "pc portable",
    author: "@rollelflex_graphy726",
    info:"aaaaaa aaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"2",
  },
  {
    img: "https://cdn9.ouedkniss.com/350/medias/announcements/images/kZ5mx/W7zMWJeYpgjN8px5iyRyoRImDeBbsJBPQTX7NO2V.jpg",
    title: "Camera",
    author: "@helloimnik",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"3",
  },
  {
    img: "https://cdn9.ouedkniss.com/1600/medias/announcements/images/lXj1/uFf90bjri8WdwkE7UBzTUz7Z7S6QNqK7DTguJmLZ.jpg",
    title: "xbox",
    author: "@nolanissac",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"4",
  },
  {
    img: "https://cdn9.ouedkniss.com/1600/medias/announcements/images/482RLx/I2ibgsKqCHkY2H2H1Nwe4yUXHkxheGHkAobac5B0.jpg",
    title: "play 4",
    author: "@hjrc33",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"5",
  },
  {
    img: "https://media.gqmagazine.fr/photos/5b990b9dd9e1220011b8986e/16:9/w_2560%2Cc_limit/la_playstation_5_pourrait_bien___tre_une_console_portable_780.jpeg",
    title: "PSP",
    author: "@arwinneil",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"6",
  },
  {
    img: "https://cdn9.ouedkniss.com/350/medias/announcements/images/31VyNn/4z6e62WXvzMvuSJ2TGDAItj4VVKq6DOgI6a124qb.jpg",
    title: "Basketball",
    author: "@tjdragotta",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"7",
  },
  {
    img: "https://cdn8.ouedkniss.com/1600/medias/announcements/images/XDoNlA/9MkVcHW9sk4eHsjo4LEuPlxOecVEpJpPi4IN6B4f.jpg",
    title: "Fern",
    author: "@katie_wasserman",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"8",
  },
  {
    img: "https://cdn9.ouedkniss.com/350/medias/announcements/images/Z4oQmJ/SmQi38Cy7yU5mvg6W56FuK4pYsCGZCPIZuUtsxDR.jpg",
    title: "Mushrooms",
    author: "@silverdalex",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"9",
  },
  {
    img: "https://cdn8.ouedkniss.com/1600/medias/announcements/images/w5oJ/lPsygiFnSMLPh8HXzolhH2EWKHummZPCtAz6FWz4.jpg",
    title: "Tomato basil",
    author: "@shelleypauls",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"10",
  },
  {
    img: "https://5.imimg.com/data5/SELLER/Default/2022/7/PW/XR/HQ/146620043/xbox-360-video-game-console-1000x1000.jpg",
    title: "Sea star",
    author: "@peterlaster",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"11",
  },
  {
    img: "https://cdn8.ouedkniss.com/1600/medias/announcements/images/Vnm19/PWmCMUHgkZ684oJ77UZEDUQjMwFDBZ19iLwEXsPD.jpg",
    title: "Bike",
    author: "@southside_customs",
    info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    id:"12",
  },
];

export default Home;
