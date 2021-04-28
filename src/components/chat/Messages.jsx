import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { useTranslation } from 'react-i18next';

const Messages = ({
  messages, currentChannelId, socket, user,
}) => {
  const { t } = useTranslation();
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
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
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
        <div className="mt-auto">
          <form novlidate="true" onSubmit={handleSubmitMsg}>
            <div className="input-group mb-3">
              <input name="body" type="text" className="form-control" aria-label="body" value={value} onChange={handleInputChange} />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">{ t('buttons.send') }</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
