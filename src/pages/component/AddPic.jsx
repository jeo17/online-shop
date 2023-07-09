import * as React from 'react';
import "./AddPic.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
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


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    return (
        <div>
        <Button sx={{
                  my: 2,
                  color: "white",
                  padding: "2px 10px",
                  display: "flex",
                  mt: 0,
                  mb: 0,
                }} variant="outlined" onClick={handleClickOpen}  endIcon={<AddIcon />}>
          Add Product
        </Button>
        <Dialog

          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
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
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container className='addPic'>
          <Grid item xs  sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Typography variant="h6" mt={2} >Add info</Typography>
          <List sx={{margin:"revert"}}>

            <Box sx={{display:"flex",mb:"5%"}}>
            <ListItem button sx={{width:"60%",border:"1px solid #132F4C",borderRadius:"10px",mr:"2%"}}> 
              <ListItemText
                primary={        <TextField 
                    fullWidth
                    id="standard-textarea"
                    label="Name of the product"
                    multiline
                    variant="standard"
                    maxRows={2}
                  />}
              />
            </ListItem>


            <ListItem button sx={{width:"60%",border:"1px solid #132F4C",borderRadius:"10px"}}> 
              <ListItemText
                primary={        
                <TextField 
                    fullWidth
                    id="standard-textarea"
                    label="Price"
                    multiline
                    variant="standard"
                    maxRows={2}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">.00 DA</InputAdornment>,
                    }}
                  />}
              />
            </ListItem>
            </Box>
            <ListItem button sx={{width:"100%",border:"1px solid #132F4C",borderRadius:"10px",mb:"8px"}}> 
              <ListItemText
                primary={        <TextField 
                    fullWidth
                    id="standard-textarea"
                    label="Specifications :"
                    multiline
                    variant="standard"
                    rows={14}
                  />}
              />
            </ListItem>
          </List>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs>





          <form className="custom__form">
    <Typography variant="h6" mt={2}>Add images</Typography>
  <div className="custom__image-container" style={{marginTop:"18px"}} >
    <label id="add-img-label" htmlFor="add-single-img">
      +
    </label>
    <input type="file" id="add-single-img" accept="image/jpeg" onChange={(eo) => {
      addImgHandler()
    }}/>
  </div>
  <input
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
        
      </div>
    );
}

export default AddPic;
