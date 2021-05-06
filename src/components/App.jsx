import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Navbar from './Navbar.jsx';
import NoMatch from './NoMatchRoute.jsx';
import Signup from './SignUp.jsx';
import { useUser } from './context/UserContext.jsx';
import AddChannelModal from './modals/AddChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';
import SocketContext from './context/SocketContext.js';
import { addMessage } from '../slices/messagesSlice.js';

const App = () => {
  const socket = React.useContext(SocketContext);
  const { user } = useUser();
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => dispatch(addMessage(message)));
  return (
    <Router>
      <div className="h-100 d-flex flex-column">
        <Navbar />
        <Switch>
          <Route exact path="/">
            { user ? <Home /> : <Redirect to="/login" /> }
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
      <AddChannelModal />
      <RemoveChannelModal />
      <RenameChannelModal />
    </Router>
  );
};
export default App;
