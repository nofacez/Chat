import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { getAllMessages } from './chat/messagesSlice.js';
import { setInitialState } from './channelsSlice.js';

const Home = () => {
  const dispatch = useDispatch();
  const { localStorage } = window;
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    dispatch(setInitialState(user.token));
  }, [dispatch]);
  console.log(user);
  // const messagesState = useSelector((state) => state);

  // console.log(messages);

  // console.log('zdes', messagesState);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        Home
      </div>
    </div>
  );
};

export default Home;
