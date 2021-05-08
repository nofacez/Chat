import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Navbar from './Navbar.jsx';
import NoMatch from './NoMatchRoute.jsx';
import Signup from './SignUp.jsx';
import { useUser } from './context/UserContext.jsx';
import AddChannelModal from './modals/AddChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';
// import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice.js';
// import { addMessage } from '../slices/messagesSlice.js';

const App = ({ socket }) => {
  const { user } = useUser();
  // const dispatch = useDispatch();
  // socket.removeAllListeners();
  // socket.on('newMessage', (message) => dispatch(addMessage(message)));

  // socket.on('newChannel', (channel) => dispatch(addChannel(channel)));

  // socket.on('removeChannel', (channel) => dispatch(removeChannel(channel)));

  // socket.on('renameChannel', (channel) => dispatch(renameChannel(channel)));
  return (
    <Router>
      <div className="h-100 d-flex flex-column">
        <Navbar socket={socket} />
        <Switch>
          <Route exact path="/">
            { user ? <Home socket={socket} /> : <Redirect to="/login" /> }
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
      <AddChannelModal socket={socket} />
      <RemoveChannelModal socket={socket} />
      <RenameChannelModal socket={socket} />
    </Router>
  );
};
export default App;
