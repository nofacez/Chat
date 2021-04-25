/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginForm from './login/LoginForm.jsx';
import Home from './chat/Home.jsx';
import Navbar from './Navbar.jsx';
import NoMatch from './NoMatchRoute.jsx';
import { useUser } from './login/UserContext.jsx';

const App = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <Router>
      <div className="h-100 d-flex flex-column">
        <Navbar />
        <Switch>
          <Route exact path="/">
            { user ? <Home /> : <Redirect to="/login" /> }
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
