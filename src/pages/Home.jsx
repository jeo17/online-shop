import * as React from "react";
import "./Home.css";
import Header from "./component/Header";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import { useTheme } from "@mui/material";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, storage } from "../firebase/config";
import { ref, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useContext } from "react";
import ThemeContext from "../context/Context";

const imgSettings = [
  {
    Name: "Edit",
    icon: <ModeEditTwoToneIcon />,
  },
  {
    Name: "Delete",
    icon: <DeleteOutlineRoundedIcon />,
  },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Home = (setmyMOde) => {
  const { myCategorieQuery, arrayItem } = useContext(ThemeContext);

  const [value, loading] = useCollection(myCategorieQuery);

  const [read, setread] = useState(false);

  const [trashID, settrashID] = useState(null);
  const [trashName, settrashName] = useState(null);
  const [trashCate, settrashCate] = useState(null);

  const [user] = useAuthState(auth);

  const theme = useTheme();

  const navigate = useNavigate();

  const [anchorEl, setanchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setanchorEl(null);
  };

  const [SrcBigImage, setSrcBigImage] = useState(null);
  const [BigImgObject, setBigImgObject] = useState([]);
  const [BigImgNbr, setBigImgNbr] = useState(1);

  const handleImgClick = (id) => {
    for (let i = 0; i < itemData2.length; i++) {
      if (itemData2[i].id === Number(id)) {
        setSrcBigImage(itemData2[i].urls[0]);

        setBigImgObject(itemData2[i].urls);

        setTimeout(() => {
          document.getElementById("BigImage").style.display = "flex";
          document.getElementById("BigImage").showModal();
        }, 400);

        break;
      }
    }
  };

  const handleImgClose = () => {
    document.getElementById("BigImage").style.display = "none";
    document.getElementById("BigImage").close();
  };

  setTimeout(() => {
    setread(true);
  }, 3300);

  // Function to delete an element by key
  function deleteElementByKey(array, key, value) {
    const index = array.findIndex((element) => element[key] === value);
    if (index !== -1) {
      array.splice(index, 1);
      console.log("Element deleted successfully.");
    } else {
      console.log("Element not found.");
    }
  }

  // function to delete the whole folder from firebase:

  const deleteFolderAndContents = async (folderPath) => {
    const folderRef = ref(storage, folderPath);

    try {
      // List all items (files) in the folder
      const items = await listAll(folderRef);

      // Delete each item (file) in the folder
      const deletePromises = items.items.map((itemRef) =>
        deleteObject(itemRef)
      );

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Once all items are deleted, you can now delete the folder itself
      await deleteObject(folderRef);

      console.log("Folder and its contents deleted successfully");
    } catch (error) {
      console.error("Error deleting folder and contents:", error);
    }
  };

  function objectExistsInArray(array, object) {
    for (var i = 0; i < array.length; i++) {
      if (JSON.stringify(array[i]) === JSON.stringify(object)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [value]);

  if (loading) {
    return (
      <Box className="loader-container">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx={40} cy={40} r={32} />
          </svg>
        </div>
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x={8} y={8} width={64} height={64} />
          </svg>
        </div>
      </Box>
    );
  }

  if (value) {
    value.docs.forEach(async (item) => {
      const folderRef = ref(
        storage,
        `/Products/${item.data().Categorie}/${item.data().Name}/${
          item.data().img_id
        }`
      );

      try {
        // List all items (files) in the folder
        const items = await listAll(folderRef);

        // Create an array to store download URLs
        const downloadURLs = [];

        // Iterate through each item (file) and get its download URL
        for (const itemRef of items.items) {
          const url = await getDownloadURL(itemRef);
          downloadURLs.push(url);
        }

        var myObject = {
          urls: downloadURLs,
          id: item.data().img_id,
          categorie: item.data().Categorie,
        };

        if (objectExistsInArray(itemData2, myObject) === false) {
          itemData2 = itemData2.concat(myObject);
        }

        // Now you can use the download URLs for further processing, such as displaying or saving the images.
      } catch (error) {
        console.error("Error downloading folder contents:", error);
      }
    });

    itemData2.sort(function (a, b) {
      return b.id - a.id;
    });
  }

  if (user) {
    if (user.uid === "1z7kIqBfyah5oLIh6KxXNtpMSrw2") {
      if (value) {
        const XboxItems = itemData2.filter((item) => item.categorie === "Xbox");
        const PlayItems = itemData2.filter(
          (item) => item.categorie === "Playstation"
        );
        const PspItems = itemData2.filter((item) => item.categorie === "Psp");
        return (
          <div>
            <Header {...{ setmyMOde }} />

            <ImageList
              sx={{
                width: "100%",
                height: "100%",
                overflowX: "hidden",
                overflowY: "hidden",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr) !important",
                  sm: "repeat(3, 1fr) !important",
                },
                margin: "6px 0 0 0",
                gap: "6px !important",
              }}
            >
              {value.docs.map((item, index) => (
                <ImageListItem
                  key={item.data().img_id}
                  sx={{
                    height: { xs: "250px !important", sm: "480px !important" },
                    overflow: "hidden",
                  }}
                >
                  <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                    <Box
                      className="moreVert"
                      id={item.data().img_id}
                      data-name={item.data().Name}
                      data-cate={item.data().Categorie}
                      onClick={(eo) => {
                        settrashID(eo.target.id);
                        settrashName(eo.target.getAttribute("data-name"));
                        settrashCate(eo.target.getAttribute("data-Cate"));
                      }}
                    ></Box>
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
                      <MenuItem
                        key={setting.Name}
                        onClick={async (eo) => {
                          handleCloseMenu();
                          if (setting.Name === "Delete") {
                            let trashIDnumber = Number(trashID);

                            await deleteDoc(doc(db, "Products", trashID));

                            console.log("first done");

                            deleteElementByKey(itemData2, "id", trashIDnumber);

                            setread(!read);

                            deleteFolderAndContents(
                              `/Products/${trashCate}/${trashName}/${trashID}`
                            );
                          }
                        }}
                      >
                        <Typography
                          textAlign="center"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color:
                              setting.Name === "Delete"
                                ? `${theme.palette.error.main}`
                                : "none",
                          }}
                        >
                          {setting.icon} &nbsp; {setting.Name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  {read === false ? (
                    <Skeleton
                      sx={{ height: "100%" }}
                      animation="wave"
                      variant="rectangular"
                    />
                  ) : (
                    <img
                      id={item.data().img_id}
                      className="small-img"
                      src={
                        arrayItem === "itemData2"
                          ? itemData2[index] !== undefined
                            ? `${itemData2[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "XboxItems"
                          ? XboxItems[index] !== undefined
                            ? `${XboxItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PlayItems"
                          ? PlayItems[index] !== undefined
                            ? `${PlayItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PspItems"
                          ? PspItems[index] !== undefined
                            ? `${PspItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : null
                      }
                      srcSet={
                        arrayItem === "itemData2"
                          ? itemData2[index] !== undefined
                            ? `${itemData2[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "XboxItems"
                          ? XboxItems[index] !== undefined
                            ? `${XboxItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PlayItems"
                          ? PlayItems[index] !== undefined
                            ? `${PlayItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PspItems"
                          ? PspItems[index] !== undefined
                            ? `${PspItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : null
                      }
                      alt={item.data().Name}
                      loading="lazy"
                      onClick={(eo) => {
                        handleImgClick(eo.target.id);
                      }}
                    />
                  )}

                  <ImageListItemBar
                    id={`1-img-bar-${index}`}
                    title={item.data().Name}
                    subtitle={`${item.data().Price}.00 DA`}
                    actionIcon={
                      <IconButton
                        onClick={(eo) => {
                          document.getElementById(
                            `2-img-bar-${index}`
                          ).style.display = "flex";
                          document.getElementById(
                            `1-img-bar-${index}`
                          ).style.display = "none";
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
                    sx={{ display: "none" }}
                    className="ImageListItemBar2"
                    title={item.data().Details}
                    actionIcon={
                      <IconButton
                        onClick={(eo) => {
                          document.getElementById(
                            `2-img-bar-${index}`
                          ).style.display = "none";
                          document.getElementById(
                            `1-img-bar-${index}`
                          ).style.display = "flex";
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

              <Box
                id="BigImage"
                className="dialog-big-img"
                component={"dialog"}
                sx={{
                  display: "none",
                  bottom: { xs: "32%", sm: "0" },
                  maxWidth: { xs: "90%", sm: "80%" },
                }}
                onKeyDown={(eo) => {
                  if (eo.key === "Escape") {
                    handleImgClose();
                    setBigImgNbr(1);
                  }
                }}
                onClick={(eo) => {
                  if (
                    eo.target.className ===
                    "dialog-big-img MuiBox-root css-34vu7h"
                  ) {
                    handleImgClose();
                    setBigImgNbr(1);
                  }
                }}
              >
                <img src={SrcBigImage} alt="Big" className="big-img" />

                <Box className="bottom-dialog-bar">
                  <Box className="dialog-bar-cont" sx={{ fontSize: "20px" }}>
                    <IconButton disabled={BigImgNbr === 1 ? true : false}>
                      <ArrowBackIosNewIcon
                        className="dialog-img-nbr"
                        onClick={(eo) => {
                          setSrcBigImage(BigImgObject[BigImgNbr - 2]);
                          setBigImgNbr(BigImgNbr - 1);
                        }}
                      />
                    </IconButton>

                    {`${BigImgNbr}/${BigImgObject.length}`}
                    <IconButton
                      disabled={
                        BigImgNbr === BigImgObject.length ? true : false
                      }
                    >
                      <ArrowForwardIosIcon
                        className="dialog-img-nbr"
                        onClick={(eo) => {
                          setSrcBigImage(BigImgObject[BigImgNbr]);
                          setBigImgNbr(BigImgNbr + 1);
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </ImageList>
          </div>
        );
      }
    } else {
      if (value) {
        const XboxItems = itemData2.filter((item) => item.categorie === "Xbox");
        const PlayItems = itemData2.filter(
          (item) => item.categorie === "Playstation"
        );
        const PspItems = itemData2.filter((item) => item.categorie === "Psp");
        return (
          <div>
            <Header {...{ setmyMOde }} />

            <ImageList
              sx={{
                width: "100%",
                height: "100%",
                overflowX: "hidden",
                overflowY: "hidden",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr) !important",
                  sm: "repeat(3, 1fr) !important",
                },
                margin: "6px 0 0 0",
                gap: "6px !important",
              }}
            >
              {value.docs.map((item, index) => (
                <ImageListItem
                  key={item.data().Details}
                  sx={{
                    height: {
                      xs: "250px !important",
                      sm: "480px !important",
                      overflow: "hidden",
                    },
                  }}
                >
                  <Checkbox
                    sx={{
                      color: "#383838",
                      position: "absolute",
                      right: "8px",
                      top: "10px",
                      transform: "scale(1.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.35)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.55)",
                      },
                      zIndex: "5",
                    }}
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                  />
                  {read === false ? (
                    <Skeleton
                      sx={{ height: "100%" }}
                      animation="wave"
                      variant="rectangular"
                    />
                  ) : (
                    <img
                      id={item.data().img_id}
                      className="small-img"
                      src={
                        arrayItem === "itemData2"
                          ? itemData2[index] !== undefined
                            ? `${itemData2[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "XboxItems"
                          ? XboxItems[index] !== undefined
                            ? `${XboxItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PlayItems"
                          ? PlayItems[index] !== undefined
                            ? `${PlayItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PspItems"
                          ? PspItems[index] !== undefined
                            ? `${PspItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : null
                      }
                      srcSet={
                        arrayItem === "itemData2"
                          ? itemData2[index] !== undefined
                            ? `${itemData2[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "XboxItems"
                          ? XboxItems[index] !== undefined
                            ? `${XboxItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PlayItems"
                          ? PlayItems[index] !== undefined
                            ? `${PlayItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : arrayItem === "PspItems"
                          ? PspItems[index] !== undefined
                            ? `${PspItems[index].urls[0]}?w=248&fit=crop&auto=format`
                            : null
                          : null
                      }
                      alt={item.data().Name}
                      loading="lazy"
                      onClick={(eo) => {
                        handleImgClick(eo.target.id);
                      }}
                      sx={{ height: "100% !important" }}
                    />
                  )}
                  <ImageListItemBar
                    id={`1-img-bar-${index}`}
                    title={item.data().Name}
                    subtitle={`${item.data().Price}.00 DA`}
                    actionIcon={
                      <IconButton
                        onClick={(eo) => {
                          document.getElementById(
                            `2-img-bar-${index}`
                          ).style.display = "flex";
                          document.getElementById(
                            `1-img-bar-${index}`
                          ).style.display = "none";
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
                    sx={{ display: "none" }}
                    className="ImageListItemBar2"
                    title={item.data().Details}
                    actionIcon={
                      <IconButton
                        onClick={(eo) => {
                          document.getElementById(
                            `2-img-bar-${index}`
                          ).style.display = "none";
                          document.getElementById(
                            `1-img-bar-${index}`
                          ).style.display = "flex";
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

              <Box
                id="BigImage"
                className="dialog-big-img"
                component={"dialog"}
                sx={{
                  display: "none",
                  bottom: { xs: "32%", sm: "0" },
                  maxWidth: { xs: "90%", sm: "80%" },
                }}
                onKeyDown={(eo) => {
                  if (eo.key === "Escape") {
                    handleImgClose();
                    setBigImgNbr(1);
                  }
                }}
                onClick={(eo) => {
                  if (
                    eo.target.className ===
                    "dialog-big-img MuiBox-root css-34vu7h"
                  ) {
                    handleImgClose();
                    setBigImgNbr(1);
                  }
                }}
              >
                <img src={SrcBigImage} alt="Big" className="big-img" />

                <Box className="bottom-dialog-bar">
                  <Box className="dialog-bar-cont" sx={{ fontSize: "20px" }}>
                    <IconButton
                      disabled={BigImgNbr === 1 ? true : false}
                      onClick={(eo) => {
                        setSrcBigImage(BigImgObject[BigImgNbr - 2]);
                        setBigImgNbr(BigImgNbr - 1);
                      }}
                    >
                      <ArrowBackIosNewIcon
                        className="dialog-img-nbr"
                        color="#fff"
                      />
                    </IconButton>

                    {`${BigImgNbr}/${BigImgObject.length}`}
                    <IconButton
                      disabled={
                        BigImgNbr === BigImgObject.length ? true : false
                      }
                      onClick={(eo) => {
                        setSrcBigImage(BigImgObject[BigImgNbr]);
                        setBigImgNbr(BigImgNbr + 1);
                      }}
                    >
                      <ArrowForwardIosIcon
                        className="dialog-img-nbr"
                        color="#fff"
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </ImageList>
          </div>
        );
      }
    }
  }
};
let itemData2 = [];

export default Home;
