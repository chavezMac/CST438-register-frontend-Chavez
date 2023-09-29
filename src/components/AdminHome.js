import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import EditStudent from './EditStudent';

const AdminHome = ()  => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState(' ');  // status message
  const [studentID, setStudentID] = useState(-1);  // status message

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

  const onEditClick = (event) => {
    const row_id = event.target.parentNode.parentNode.rowIndex;
    console.log("editClick "+row_id);
    setStudentID(row_id);
    }

    /*
    * add student
    */
    const addStudent = (student) => {
      setMessage(' ');
      fetch(SERVER_URL + '/student',
      { method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(student)
      })
      .then(res => {
        if (res.ok) {
          fetchStudents();
          setMessage('Student added');
        } else {
          setMessage('Error when saving');
        }
      })
      .catch(err => {
        setMessage('Error when saving' + err);
      })
    }


    const dropStudent = (event) => {
      setMessage('');
      const row_id = event.target.parentNode.parentNode.rowIndex - 1;
      console.log("drop student "+row_id);
      const student_id = students[row_id].id;

      if(window.confirm('Are you sure you want to drop this student?')) {
        fetch(`${SERVER_URL}/student/${student_id}`,
        {
          method: 'DELETE',
        }
        )
        .then(res => {
          if(res.ok) {
            console.log("dropStudent ok");
            setMessage("Student dropped.");
            fetchStudents();
          }else if(res.status == 400){
            if(window.confirm("Do you want to force delete this student?")) {
              fetch(`${SERVER_URL}/student/${student_id}?force=yes`,
              {
                method: 'DELETE',
              }
              )
              .then(res => {
                if(res.ok) {
                  console.log("dropStudent ok");
                  setMessage("Student forcibly dropped.");
                  fetchStudents();
                }else {
                  console.log('error dropStudent ' + res.status);
                  setMessage("Error in force delete. "+res.status);
                }
              })
            }else {
              console.log('error dropStudent ' + res.status);
              setMessage("Error. "+res.status);
            }
          }
        })
        .catch(err => {
          console.error("exception dropStudent "+ err);
          setMessage("Exception. "+err);
        });
      }
    };

    const editStudent = (student) => {
      setMessage('');
      console.log("In ediStudent... "+ studentID);
      fetch(`${SERVER_URL}/student/${studentID}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(student)

      })
      .then(res => {
        if(res.ok) {
          console.log("editStudent ok");
          setMessage("Student edited.");
          fetchStudents();
        } else {
          console.log('error editStudent ' + res.status);
          setMessage("Error. "+res.status);
        }
      })
      .catch(err => {
        console.error("exception editStudent "+ err);
        setMessage("Exception. "+err);
      });
    };


    const headers = ['Id','Name','Email','Status Code','Status','Drop','Click to store ID'];
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
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.statusCode}</td>
                    <td>{row.status}</td>
                    <td><button type="button" margin="auto" onClick={dropStudent}>Drop</button></td>
                    <td><button type="button" margin="auto" onClick={onEditClick}>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
       <AddStudent addStudent={addStudent} />
       <EditStudent editStudent={editStudent} />

      </div>
      );
    }
    
}

export default AdminHome;