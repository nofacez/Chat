import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';
import { io } from 'socket.io-client';
import { setInitialState } from './channelsSlice.js';
import { addMessage } from './messagesSlice.js';

const Home = () => {
  const socket = io('http://localhost:5000');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { localStorage } = window;
  const user = JSON.parse(localStorage.getItem('user'));
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);
  useEffect(() => {
    dispatch(setInitialState(user.token));
  }, [dispatch]);
  useEffect(() => {
    socket.on('newMessage', (message) => dispatch(addMessage(message)));
  }, []);

  const activeBtnClasses = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', 'btn-primary');
  const btnClasses = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', 'btn-light');

  const renderChannels = () => {
    console.log('chan', channels);
    return (
      <ul className="nav flex-column nav-pills">
        { channels.map(({ id, name }) => (
          <li className="nav-item" key={uniqueId()}>
            <button type="button" className={id === currentChannelId ? activeBtnClasses : btnClasses}>{name}</button>
          </li>
        ))}
      </ul>
    );
  };

  const renderMessages = () => {
    console.log(messages);
    return (
      <div id="messages-box" className="chat-messages mb-3 overflow-auto">
        { messages && messages
          .filter(({ channelId }) => channelId === currentChannelId)
          .map(({ body, username }) => (
            <div className="text-break" key={uniqueId()}>
              <b>{username}</b>
              :&nbsp;
              {body}
            </div>
          ))}
      </div>
    );
  };

  const [value, setValue] = useState('');
  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const handleSubmitMsg = (e) => {
    e.preventDefault();
    try {
      socket.emit('newMessage', { username: user.username, body: value, channelId: currentChannelId }, (data) => console.log(data.status));
      setValue('');
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div className="row pb-5 flex-grow-1 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>
            { t('chat.channels') }
          </span>
        </div>
        { renderChannels() }
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          { renderMessages() }
          <div className="mt-auto">
            <form novlidate="true" onSubmit={handleSubmitMsg}>
              <div className="input-group mb-3">
                <input name="body" type="text" className="form-control" aria-label="body" value={value} onChange={handleInputChange} />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">{ t('chat.sendMsgBtn') }</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
