import * as React from "react";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ItemContext from "../context/ItemFunctions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const {
    handleClickOpen,
    handleClose,
    open,
    setOpen,
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    handleDescription,
    handleStatus,
    handleTitle,
    id,
    setId,
    typeStatus,
    setTypeStatus,
    handleSubmit,
    handleDelete,
  } = useContext(ItemContext);
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitle}
          />
        </BootstrapDialogTitle>

        <Box sx={{ width: "90%", margin: "auto" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              value={status}
              onChange={handleStatus}
            >
              <MenuItem value={"Not Started"}>Not Started</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <DialogContent dividers>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={10}
            value={description}
            onChange={handleDescription}
          />
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleSubmit(id, typeStatus);

              handleClose();
            }}
          >
            Save changes
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleDelete(id, typeStatus);
              handleClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
