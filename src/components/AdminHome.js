import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import {SERVER_URL} from '../constants';

const AdminHome = ()  => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState(' ');  // status message

    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
		//TODO complete this method to fetch students and display list of students 
      fetch('http://localhost:8080/student')
      .then((response) => {return response.json();})
      .then((data) => {setStudents(data);})
      .catch((err) => {
        console.log("exception fetchStudents "+err);
        setMessage("Exception."+err);
      } );
    }
    
    /*
    * add student
    */
    const addStudent = (student_name,student_email) => {
      setMessage('');
      fetch(`${SERVER_URL}/student`, {
        method: 'POST',
      })
      .then(res => {
        if(res.ok) {
          console.log("addStudent ok");
          setMessage("Student added.");
          fetchStudents();
        }else {
          console.log('error addStudent ' + res.status);
          setMessage("Error. "+ res.status);
        }})
      .catch(err => {
        console.error("exception addStudent " + err);
        setMessage("Exception. " +err);
      })

    }

    const headers = ['Name','Email','Status Code','Status'];
    if(students.length === 0) {
      return (
        <div>
            <h3>No Enrolled Students </h3>
            <h4>{message}</h4>
            <AddStudent addStudent={addStudent} />
        </div>
      );

    }else {
      return (
        <div margin="auto" >
        <h3>Enrolled Students</h3>
        <h4>{message}</h4>
        <table className="Center"> 
            <thead>
            <tr>
                {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
            </tr>
            </thead>
            <tbody>
            {students.map((row,idx) => (
                    <tr key={idx}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.statusCode}</td>
                    <td>{row.status}</td>
                    {/* <td><button type="button" margin="auto" onClick={dropCourse}>Drop</button></td> */}
                    </tr>
                ))}
            </tbody>
        </table>
        <AddStudent addStudent={addStudent} />
      </div>
      );
    }
    
}

export default AdminHome;