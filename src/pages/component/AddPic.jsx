import * as React from "react";
import "./AddPic.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

/********************************************************************** */

const imgFiles = [];
const addImgHandler = () => {
  let imgInputHelper = document.getElementById("add-single-img");
  const imgInputHelperLabel = document.getElementById("add-img-label");
  const imgContainer = document.querySelector(".custom__image-container");
  const file = imgInputHelper.files[0];
  if (!file) return;
  // Generate img preview
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const newImg = document.createElement("img");
    newImg.src = reader.result;
    imgContainer.insertBefore(newImg, imgInputHelperLabel);
  };
  // Store img file
  imgFiles.push(file);
  // Reset image input
  imgInputHelper.value = "";
  return;
};

// check inputs if they are empty function

const isEmpty = (eo) => {
  if (eo.target.value === undefined || eo.target.value === "") {
    return true;
  } else {
    return false;
  }
};

/*   submitig the images 
 
const getImgFileList = (imgFiles) => {
  const imgFilesHelper = new DataTransfer();
  imgFiles.forEach((imgFile) => imgFilesHelper.items.add(imgFile));
  return imgFilesHelper.files;
};
const customFormSubmitHandler = (ev) => {
  ev.preventDefault();
  const firstImgInput = document.getElementById("image-input");
  firstImgInput.files = getImgFileList(imgFiles);
  // submit form to server, etc
};
document
  .querySelector(".custom__form")
  .addEventListener("submit", customFormSubmitHandler);  */

const AddPic = () => {
  const theme = useTheme();

  const [EmptyTitle, setEmptyTitle] = useState(true);
  const [EmptyPrice, setEmptyPrice] = useState(true);
  const [EmptySpc, setEmptySpc] = useState(true);
  const [title, settitle] = useState(null);
  const [cate, setcate] = useState(null);
  const [spc, setspc] = useState(null);
  const [price, setprice] = useState(null);
  let [img, setimg] = useState(null);
  const [save, setsave] = useState("Save");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handle the categorie input:
  const handleChange = (event) => {
    setcate(event.target.value);
  };

  return (
    <Box>
      <Button
        sx={{
          my: 2,
          color: {
            xs: theme.palette.mode === "dark" ? "inherit" : "#464646",
            md: "white",
          },
          padding: { xs: "2px 0", md: "2px 10px" },
          display: "flex",
          mt: 0,
          mb: 0,
          border: "none",
        }}
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add Product
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", width: { xs: "100vw", sm: "inherit" } }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New Product
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={async (eo) => {
                setsave(
                  <CircularProgress color="inherit" sx={{ scale: "0.8" }} />
                );

                let id = Date.now();

                await setDoc(doc(db, "Products", `${id}`), {
                  Name: title,
                  Price: price,
                  Details: spc,
                  Categorie: cate,
                  img_id: id,
                });

                console.log("done");

                const imageref = ref(storage, `/Products/${cate}/${title}/${id}/1`);

                await uploadBytes(imageref, img)
                  .then(() => {
                    console.log("“image save successfully”");
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });

                handleClose();
                setEmptyPrice(true);
                setEmptyTitle(true);
                setEmptySpc(true);
                setimg(null);
                window.location.reload();
              }}
              disabled={
                EmptyPrice === false &&
                EmptyTitle === false &&
                EmptySpc === false &&
                cate !== null
                  ? false
                  : true
              }
            >
              {save}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          className="addPic"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Grid
            item
            xs
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: { xs: "90vw", sm: "inherit" },
              ml: { xs: "5vw", sm: "inherit" },
            }}
          >
            <Typography variant="h6" mt={2}>
              Add info
            </Typography>
            <List sx={{ margin: "revert", width: "70%" }}>
              <Box sx={{ display: "flex", mb: "4%" }}>
                <ListItem
                  sx={{
                    width: "50%",
                    border: "1px solid",
                    borderRadius: "10px",
                    mr: "2%",
                  }}
                >
                  <ListItemText
                    primary={
                      <TextField
                        onChange={(eo) => {
                          setEmptyTitle(isEmpty(eo));
                          settitle(eo.target.value);
                        }}
                        fullWidth
                        id="standard-textarea"
                        label="Name of the product"
                        multiline
                        variant="standard"
                        maxRows={2}
                      />
                    }
                  />
                </ListItem>

                <ListItem
                  sx={{
                    width: "50%",
                    border: "1px solid",
                    borderRadius: "10px",
                    mr: "2%",
                  }}
                >
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label" >
                      Categories
                    </InputLabel> 
                    <Select
                    sx={{"&::before": { border: "none" }}}
                      id="demo-simple-select"
                      value={cate}
                      label="Categories"
                      onChange={(eo) => {
                        handleChange(eo);
                      }}
                    >
                      <MenuItem value={"Xbox"}>Xbox</MenuItem>
                      <MenuItem value={"Playstation"}>Playstation</MenuItem>
                      <MenuItem value={"Psp"}>Psp</MenuItem>
                      <MenuItem value={"Other thing"}>Other thing</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </Box>
              <ListItem
                sx={{
                  width: "100%",
                  border: "1px solid",
                  borderRadius: "10px",
                  mb: "4%",
                }}
              >
                <ListItemText
                  primary={
                    <TextField
                      onChange={(eo) => {
                        setEmptySpc(isEmpty(eo));
                        setspc(eo.target.value);
                      }}
                      fullWidth
                      id="standard-textarea"
                      label="Specifications :"
                      multiline
                      variant="standard"
                      rows={10}
                    />
                  }
                />
              </ListItem>

              <ListItem sx={{ border: "1px solid", borderRadius: "10px" }}>
                <ListItemText
                  primary={
                    <TextField
                      onChange={(eo) => {
                        setEmptyPrice(isEmpty(eo));
                        setprice(eo.target.value);
                      }}
                      fullWidth
                      id="standard-textarea"
                      label="Price"
                      multiline
                      variant="standard"
                      maxRows={2}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">.00 DA</InputAdornment>
                        ),
                      }}
                    />
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs sx={{ width: { xs: "90vw", sm: "inherit" } }}>
            <form className="custom__form">
              <Typography variant="h6" mt={2}>
                Add images
              </Typography>
              <div
                className="custom__image-container"
                style={{ marginTop: "18px" }}
              >
                <label
                  id="add-img-label"
                  htmlFor="add-single-img"
                  style={{
                    border:
                      theme.palette.mode === "dark"
                        ? "solid 1px white"
                        : "solid 1px black",
                  }}
                >
                  +
                </label>
                <input
                  type="file"
                  id="add-single-img"
                  accept="image/jpeg"
                  onChange={(eo) => {
                    setimg(eo.target.files[0]);
                    addImgHandler();
                  }}
                />
              </div>
              <input
                onChange={(eo) => {}}
                type="file"
                id="image-input"
                name="photos"
                accept="image/jpeg"
                multiple=""
              />
              <br />
            </form>
          </Grid>
        </Grid>
      </Dialog>
    </Box>
  );
};

export default AddPic;
