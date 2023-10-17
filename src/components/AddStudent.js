import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({name: '', email: ''});
  const [message, setMessage] = useState(' ');  // status message

  const handleClickOpen = () => {
    setMessage(' ');
    setStudent({name: '', email: ''});
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleChange = (event) => {
      setStudent({
        ...student, 
        [event.target.name]: event.target.value
      });
  }

// Save student and close modal form
  const handleAdd = () => {
    props.addStudent(student);
      handleClose();
  }

  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <TextField autoFocus fullWidth label="name" name="name" id="name" onChange={handleChange}  /> 
                <TextField autoFocus fullWidth label="email" name="email" id="email" onChange={handleChange}  />  
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

export default AddStudent;