import React from 'react';
import { useSelector } from 'react-redux';
import MessagesForm from '../forms/MessagesForm.jsx';

const Messages = ({ user }) => {
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages mb-3 overflow-auto">
          { messages
            .filter(({ channelId }) => channelId === currentChannelId)
            .map(({ body, username, id }) => (
              <div className="text-break" key={id}>
                <b>{username}</b>
                {': '}
                {body}
              </div>
            )) }
        </div>
        <MessagesForm user={user} />
      </div>
    </div>
  );
};

export default Messages;
