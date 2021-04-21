/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import LoginForm from './login/LoginForm.jsx';
import Home from './Home.jsx';
import NoMatch from './NoMatchRoute.jsx';
import { useUser } from './login/UserContext.jsx';

const App = () => {
  const { localStorage } = window;
  console.log(localStorage);
  const { user } = useUser();
  console.log(user);
  return (
    <Router>
      <div className="h-100 d-flex flex-column">
        <nav className="navbar navbar-light bg-light">
          <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        </nav>
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
