import React from "react";
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
import SvgIcon from "@mui/material/SvgIcon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ContactsIcon from "@mui/icons-material/Contacts";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AddPic from "./AddPic";
import { signOut } from "firebase/auth";
import { auth, db,storage } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
<<<<<<< HEAD
import { useTheme, Drawer } from "@mui/material";
import {useContext } from "react";
import Context from "../../context/Context";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where,orderBy } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";



=======
import { useTheme } from "@mui/material";
>>>>>>> a2192e91aa2322217e6c4d1f08bae2c8478a81bf

const pages = [
  {
    Name: "Contact",
    endIcon: <ContactsIcon />,
    startIcon: "",
  },
];

const settings = [
  {
    Name: "Account",
    icon: <AccountCircleIcon />,
  },
  {
    Name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    Name: "Logout",
    icon: <LogoutIcon />,
  },
];

const settings2 = [
  {
    Name: "Saved",
    icon: <BookmarksIcon />,
  },
  {
    Name: "Logout",
    icon: <LogoutIcon />,
  },
];

/********    functions of contact dialog      **********/

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog className="contact-us" onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>Contact Us</DialogTitle>
      <List sx={{ pt: 0, flexDirection: { xs: "column", sm: "row" } }}>
        <ListItem>
          <a
            className="facebook"
            href="https://www.facebook.com/hamo.milano"
            target="_blank"
            rel="noopener noreferrer" 
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <FacebookIcon sx={{ transform: "scale(3)" }} />
          </a>
        </ListItem>
        <ListItem>
          <a className="phone" href="tel:0794870863">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <LocalPhoneIcon sx={{ transform: "scale(3)" }} />
          </a>
        </ListItem>
        <ListItem>
          <a
            className="instagram"
            target="_blank"
            rel="noopener noreferrer" 
            href="https://www.instagram.com/milano.hamo/?igshid=MzRlODBiNWFlZA%3D%3D&fbclid=IwAR1XjaUP-fDPm7-EzjSKkGxG4Vij63BqgjHDe2GHcOfxtzV_9zwiuDOT6lo"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <InstagramIcon sx={{ transform: "scale(3)" }} />
          </a>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Header = (setmyMOde) => {  
  
  const {Query,changeArray} = useContext(Context);

  const [value] = useCollection( query( collection(db, "Products"), orderBy("img_id", "desc")) )



  function objectExistsInArray(array, object) {
    for (var i = 0; i < array.length; i++) {
      if (JSON.stringify(array[i]) === JSON.stringify(object)) {
        return true;
      }
    }
    return false;
  }



  if (value) {
    value.docs.map((item) =>
      getDownloadURL(
        ref(storage, `/Products/${item.data().Categorie}/${item.data().Name}/${item.data().img_id}/1`)
      )
        .then((url) => {
          var myObject = {
            url: url,
            id: item.data().img_id,
            categorie: item.data().Categorie,
          };

          if (objectExistsInArray(itemData2, myObject) === false) {
            itemData2 = itemData2.concat(myObject);
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
    );
  }

  if (value) {
    itemData2.sort(function (a, b) {
      return b.id - a.id;
    });
  }




  const theme = useTheme();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [openContact, setOpenContact] = React.useState(false);

  const handleClickOpen = () => {
    setOpenContact(true);
  };

  const handleClose = (value) => {
    setOpenContact(false);
  };

  const [openCate, setOpenCate] = React.useState(false);

  const handleClick = () => {
    setOpenCate(!openCate);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
            HAMO <br /> STORE
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
                <MenuItem
                  key={page.Name}
                  onClick={(eo) => {
                    handleCloseNavMenu();
                    handleClickOpen();
                  }}
                >
                  <Typography textAlign="center" sx={{ display: "flex" }}>
                    {page.Name}
                  </Typography>
                  <IconButton aria-label="delete">{page.endIcon}</IconButton>
                </MenuItem>
              ))}
              <MenuItem onClick={handleClick}>
                <ListItemText primary="Categories" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
              <Collapse in={openCate} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={(eo) => {
                    Query(query(collection(db, "Products"), where( "Categorie", "==", "Xbox")))
                    changeArray("XboxItems")
                  }}>
                    <ListItemIcon>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#228BE6"
                          viewBox="0 0 50 50"
                          width="50px"
                          height="50px"
                        >
                          <path d="M 25 2 C 20.709 2 16.618563 3.2007813 13.226562 5.3007812 C 13.007563 5.3737813 12.629156 5.6617969 12.285156 5.9667969 C 15.330156 3.5477969 22.371734 8.3929375 24.427734 9.8359375 C 24.773734 10.078938 25.228219 10.078938 25.574219 9.8359375 C 27.630219 8.3929375 34.671797 3.5467969 37.716797 5.9667969 C 37.372797 5.6617969 36.993391 5.3737813 36.775391 5.3007812 C 33.382391 3.2007813 29.291 2 25 2 z M 11 8 C 9.403 8 8.2363281 9.3007812 8.2363281 9.3007812 C 4.4443281 13.400781 2.0507812 18.9 2.0507812 25 C 2.0507812 37.7 12.328 48 25 48 C 31.685 48 37.771891 45.1 41.962891 40.5 C 41.962891 40.5 41.464094 37.499609 38.371094 33.099609 C 34.912094 27.882609 27.905109 21.311922 25.662109 19.294922 C 25.279109 18.950922 24.708125 18.952781 24.328125 19.300781 C 22.638125 20.847781 18.277406 25.177781 17.316406 26.300781 C 15.021406 28.700781 8.6353281 36.299609 8.2363281 40.599609 C 8.2363281 40.599609 6.8386406 37.200391 9.9316406 29.400391 C 11.856641 24.714391 17.835375 17.747984 20.734375 14.708984 C 21.119375 14.305984 21.110125 13.669109 20.703125 13.287109 C 19.743125 12.388109 17.505281 10.812609 15.488281 9.5996094 C 14.092281 8.6996094 12.497 8.1 11 8 z M 38.689453 8 C 38.036453 8 33.794078 9.3428281 29.330078 13.298828 C 28.908078 13.672828 28.891203 14.325469 29.283203 14.730469 C 30.900203 16.401469 35.322656 20.681391 37.972656 24.900391 C 41.265656 30.300391 43.2605 34.6 42.0625 40.5 C 45.7545 36.4 48.050781 31 48.050781 25 C 47.950781 19 45.655281 13.500391 41.863281 9.4003906 C 41.763281 9.3003906 41.663453 9.1996094 41.564453 9.0996094 C 40.766453 8.1996094 39.587453 8 38.689453 8 z" />
                        </svg>
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Xbox" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} onClick={(eo) => {
                    Query(query(collection(db, "Products"), where( "Categorie", "==", "Playstation")))
                    changeArray("PlayItems")

                  }}>
                    <ListItemIcon>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#228BE6"
                          viewBox="0 0 30 30"
                          width="60px"
                          height="60px"
                        >
                          <path d="M 11.181641 3.7421875 L 11.181641 24.857422 L 15.761719 26.257812 L 15.761719 8.5761719 C 15.761719 8.0671719 15.761625 7.8135937 16.015625 7.5585938 C 16.142625 7.3045937 16.396391 7.3046406 16.650391 7.4316406 C 17.286391 7.6856406 17.669922 8.1948906 17.669922 9.2128906 L 17.669922 16.207031 C 19.195922 16.970031 20.466375 16.970031 21.484375 16.207031 C 22.502375 15.444031 23.011719 14.300578 23.011719 12.392578 C 23.012719 10.357578 22.630234 9.0853594 21.740234 8.0683594 C 20.977234 7.0503594 19.578969 6.1594375 17.542969 5.5234375 C 14.998969 4.7604375 12.835641 4.1241875 11.181641 3.7421875 z M 9.9101562 16.972656 L 4.0585938 19.007812 L 3.1699219 19.388672 C 1.7709219 20.024672 1.0078125 20.660875 1.0078125 21.296875 C 1.1348125 22.059875 1.388875 23.078844 3.296875 23.714844 C 5.077875 24.350844 6.4770625 24.604891 10.039062 23.587891 L 10.039062 21.296875 C 6.6030625 22.440875 6.0949375 22.314547 5.5859375 22.060547 C 5.0769375 21.806547 5.076125 21.550828 5.203125 21.423828 C 5.585125 21.169828 6.984375 20.660156 6.984375 20.660156 L 9.9101562 19.642578 L 9.9101562 16.972656 z M 22.853516 17.962891 C 22.440109 17.948984 22.026781 17.956531 21.613281 17.988281 C 20.214281 17.988281 18.941063 18.243 17.414062 18.625 L 17.414062 21.296875 L 20.212891 20.277344 L 21.738281 19.769531 C 21.738281 19.769531 22.375812 19.642625 22.757812 19.515625 C 23.393812 19.388625 24.15625 19.642578 24.15625 19.642578 C 24.53825 19.642578 24.792969 19.768438 24.792969 20.023438 C 24.919969 20.277438 24.665297 20.406156 24.029297 20.660156 L 22.630859 21.169922 L 17.542969 23.076172 L 17.542969 25.748047 L 19.832031 24.984375 L 26.191406 22.695312 L 26.955078 22.3125 C 28.481078 21.8035 29.117234 21.167297 28.990234 20.404297 C 28.990234 19.642297 28.100219 19.134 26.574219 18.625 C 25.333719 18.24325 24.093734 18.004609 22.853516 17.962891 z" />
                        </svg>
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="PlayStation" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}  onClick={(eo) => {
                    Query(query(collection(db, "Products"), where( "Categorie", "==", "Psp")))
                    changeArray("PspItems")
                  }}>
                    <ListItemIcon>
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
                    </ListItemIcon>
                    <ListItemText primary="PSP" />
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 4 }}  onClick={(eo) => {
                    Query(query( collection(db, "Products"),orderBy("img_id", "desc")))
                    changeArray("itemData")
                  }}>
                    <ListItemText>
                    <Typography variant="body1" color="#228be4" sx={{fontWeight:"900"}}>ALL</Typography>
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>

              {user.uid === "1z7kIqBfyah5oLIh6KxXNtpMSrw2" && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <ListItemText primary={<AddPic />} />
                </MenuItem>
              )}
            </Menu>
          </Box>

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
            HAMO <br /> STORE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.Name}
                onClick={(eo) => {
                  handleCloseNavMenu();
                  handleClickOpen();
                }}
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

            <SimpleDialog open={openContact} onClose={handleClose} />

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
              <Collapse in={open} timeout="auto" unmountOnExit sx={{zIndex:"8"}}>
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

                  <ListItemButton sx={{ pl: 4 }}  onClick={(eo) => {
                    Query(query(collection(db, "Products"), where( "Categorie", "==", "Xbox")))
                    changeArray("XboxItems")
                  }}>
                    <ListItemText>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#228BE6"
                          viewBox="0 0 50 50"
                          width="50px"
                          height="50px"
                        >
                          <path d="M 25 2 C 20.709 2 16.618563 3.2007813 13.226562 5.3007812 C 13.007563 5.3737813 12.629156 5.6617969 12.285156 5.9667969 C 15.330156 3.5477969 22.371734 8.3929375 24.427734 9.8359375 C 24.773734 10.078938 25.228219 10.078938 25.574219 9.8359375 C 27.630219 8.3929375 34.671797 3.5467969 37.716797 5.9667969 C 37.372797 5.6617969 36.993391 5.3737813 36.775391 5.3007812 C 33.382391 3.2007813 29.291 2 25 2 z M 11 8 C 9.403 8 8.2363281 9.3007812 8.2363281 9.3007812 C 4.4443281 13.400781 2.0507812 18.9 2.0507812 25 C 2.0507812 37.7 12.328 48 25 48 C 31.685 48 37.771891 45.1 41.962891 40.5 C 41.962891 40.5 41.464094 37.499609 38.371094 33.099609 C 34.912094 27.882609 27.905109 21.311922 25.662109 19.294922 C 25.279109 18.950922 24.708125 18.952781 24.328125 19.300781 C 22.638125 20.847781 18.277406 25.177781 17.316406 26.300781 C 15.021406 28.700781 8.6353281 36.299609 8.2363281 40.599609 C 8.2363281 40.599609 6.8386406 37.200391 9.9316406 29.400391 C 11.856641 24.714391 17.835375 17.747984 20.734375 14.708984 C 21.119375 14.305984 21.110125 13.669109 20.703125 13.287109 C 19.743125 12.388109 17.505281 10.812609 15.488281 9.5996094 C 14.092281 8.6996094 12.497 8.1 11 8 z M 38.689453 8 C 38.036453 8 33.794078 9.3428281 29.330078 13.298828 C 28.908078 13.672828 28.891203 14.325469 29.283203 14.730469 C 30.900203 16.401469 35.322656 20.681391 37.972656 24.900391 C 41.265656 30.300391 43.2605 34.6 42.0625 40.5 C 45.7545 36.4 48.050781 31 48.050781 25 C 47.950781 19 45.655281 13.500391 41.863281 9.4003906 C 41.763281 9.3003906 41.663453 9.1996094 41.564453 9.0996094 C 40.766453 8.1996094 39.587453 8 38.689453 8 z" />
                        </svg>
                      </SvgIcon>
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}   onClick={(eo) => {
                    Query(query(collection(db, "Products"), where( "Categorie", "==", "Playstation")))
                    changeArray("PlayItems")

                  }}>
                    <ListItemText>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#228BE6"
                          viewBox="0 0 30 30"
                          width="60px"
                          height="60px"
                        >
                          <path d="M 11.181641 3.7421875 L 11.181641 24.857422 L 15.761719 26.257812 L 15.761719 8.5761719 C 15.761719 8.0671719 15.761625 7.8135937 16.015625 7.5585938 C 16.142625 7.3045937 16.396391 7.3046406 16.650391 7.4316406 C 17.286391 7.6856406 17.669922 8.1948906 17.669922 9.2128906 L 17.669922 16.207031 C 19.195922 16.970031 20.466375 16.970031 21.484375 16.207031 C 22.502375 15.444031 23.011719 14.300578 23.011719 12.392578 C 23.012719 10.357578 22.630234 9.0853594 21.740234 8.0683594 C 20.977234 7.0503594 19.578969 6.1594375 17.542969 5.5234375 C 14.998969 4.7604375 12.835641 4.1241875 11.181641 3.7421875 z M 9.9101562 16.972656 L 4.0585938 19.007812 L 3.1699219 19.388672 C 1.7709219 20.024672 1.0078125 20.660875 1.0078125 21.296875 C 1.1348125 22.059875 1.388875 23.078844 3.296875 23.714844 C 5.077875 24.350844 6.4770625 24.604891 10.039062 23.587891 L 10.039062 21.296875 C 6.6030625 22.440875 6.0949375 22.314547 5.5859375 22.060547 C 5.0769375 21.806547 5.076125 21.550828 5.203125 21.423828 C 5.585125 21.169828 6.984375 20.660156 6.984375 20.660156 L 9.9101562 19.642578 L 9.9101562 16.972656 z M 22.853516 17.962891 C 22.440109 17.948984 22.026781 17.956531 21.613281 17.988281 C 20.214281 17.988281 18.941063 18.243 17.414062 18.625 L 17.414062 21.296875 L 20.212891 20.277344 L 21.738281 19.769531 C 21.738281 19.769531 22.375812 19.642625 22.757812 19.515625 C 23.393812 19.388625 24.15625 19.642578 24.15625 19.642578 C 24.53825 19.642578 24.792969 19.768438 24.792969 20.023438 C 24.919969 20.277438 24.665297 20.406156 24.029297 20.660156 L 22.630859 21.169922 L 17.542969 23.076172 L 17.542969 25.748047 L 19.832031 24.984375 L 26.191406 22.695312 L 26.955078 22.3125 C 28.481078 21.8035 29.117234 21.167297 28.990234 20.404297 C 28.990234 19.642297 28.100219 19.134 26.574219 18.625 C 25.333719 18.24325 24.093734 18.004609 22.853516 17.962891 z" />
                        </svg>
                      </SvgIcon>
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}   onClick={(eo) => {
                    Query(query(collection(db, "Products"), where( "Categorie", "==", "Psp")))
                    changeArray("PspItems")
                  }}>
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





                  <ListItemButton sx={{ pl: 4 }}  onClick={(eo) => {
                    Query(query( collection(db, "Products"),orderBy("img_id", "desc")))
                    changeArray("itemData")
                  }}>
                    <ListItemText>
                    <Typography variant="body1" color="#228be4" sx={{fontWeight:"900"}}>ALL</Typography>
                    </ListItemText>
                  </ListItemButton>




                </List>
              </Collapse>
            </Button>

            {user.uid === "1z7kIqBfyah5oLIh6KxXNtpMSrw2" && (

                <ListItemButton sx={{flexGrow :"0"}}>
                  <ListItemText primary={<AddPic />} />
                </ListItemButton>
   
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  defaultChecked={theme.palette.mode === "dark" ? true : false}
                />
              }
              label=""
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );

                setmyMOde.setmyMOde.setmyMOde(
                  theme.palette.mode === "light" ? "dark" : "light"
                );
              }}
            />

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={
                    user.uid === "1z7kIqBfyah5oLIh6KxXNtpMSrw2"
                      ? "H"
                      : user.displayName
                  }
                  src={
                    user.uid === "1z7kIqBfyah5oLIh6KxXNtpMSrw2"
                      ? "./292606090_1210144579836175_6424786474028542165_n.jpg"
                      : user.photoURL
                  }
                />
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
              {user.uid === "1z7kIqBfyah5oLIh6KxXNtpMSrw2" &&
                settings.map((setting) => (
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    key={setting.Name}
                    onClick={(eo) => {
                      handleCloseUserMenu();
                      if (setting.Name === "Logout") {
                        signOut(auth)
                          .then(() => {
                            console.log("signout succ");
                            navigate("/");
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting.Name}</Typography>
                    <IconButton
                      sx={{
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      {setting.icon}
                    </IconButton>
                  </MenuItem>
                ))}

              {user.uid !== "1z7kIqBfyah5oLIh6KxXNtpMSrw2" &&
                settings2.map((setting) => (
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    key={setting.Name}
                    onClick={(eo) => {
                      handleCloseUserMenu();
                      if (setting.Name === "Logout") {
                        signOut(auth)
                          .then(() => {
                            console.log("signout succ");
                            navigate("/");
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting.Name}</Typography>
                    <IconButton
                      sx={{
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      {setting.icon}
                    </IconButton>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

let itemData2 = [];
export default Header;
