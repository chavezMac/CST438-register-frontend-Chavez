import '../Home.css';
import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import StudentHome from './StudentHome';
import AdminHome from './AdminHome';
import ShowSchedule from './ShowSchedule';
import EditStudent from './EditStudent';

function Home() {
  return (
    <div className="App">
      <h2>Registration Service</h2>
        <BrowserRouter>
          <div>
            <Link to="/">Student</Link>{' '}
            &nbsp;|&nbsp;&nbsp;
            <Link to="/admin">Admin</Link>{' '}
            <Switch>
              <Route exact path="/" component={StudentHome} />
              <Route path="/schedule" component={ShowSchedule} />
              <Route path="/admin" component={AdminHome} />
              <Route path="/editStudent" component={EditStudent} />       
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}


export default Home;