import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants';

const EditStudent = (props)  => {

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
      const handleEdit = () => {
        props.editStudent(student);
          handleClose();
      }

    return (
        //Open a modal form to edit the student
        <div>
            <Button id="editStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                Edit Student
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                    <TextField autoFocus fullWidth label="name" name="name" onChange={handleChange}  />
                    <TextField autoFocus fullWidth label="email" name="email" onChange={handleChange}  />
                </DialogContent>
                <DialogActions>
                <Button color="secondary" onClick={handleClose}>Cancel</Button>
                <Button id="edit" color="primary" onClick={handleEdit}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>                       
    )
}

export default EditStudent;