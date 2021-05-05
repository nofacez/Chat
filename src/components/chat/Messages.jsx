import React from 'react';
import {
  InputGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import SocketContext from '../context/SocketContext';

const Messages = ({
  messages, currentChannelId, user,
}) => {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    body: yup.string().required(t('errors.emptyMessage')),
  });
  const socket = React.useContext(SocketContext);
  const handleSubmitMsg = (text) => {
    console.log('MSG', text);
    socket.emit('newMessage', { username: user.username, body: text, channelId: currentChannelId }, (data) => console.log(data.status));
  };

  console.log('all messages:', messages);
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages mb-3 overflow-auto">
          { messages && messages
            .filter(({ channelId }) => channelId === currentChannelId)
            .map(({ body, username, id }) => (
              <div className="text-break" key={id}>
                <b>{username}</b>
                {': '}
                {body}
              </div>
            )) }
        </div>
        <div className="mt-auto">
          <Formik
            initialValues={{
              body: '',
            }}
            validateOnChange={false}
            validationSchema={schema}
            onSubmit={(values, actions) => {
              handleSubmitMsg(values.body);
              actions.resetForm();
            }}
          >
            {({
              values, handleChange, handleSubmit, errors, isValid, isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} noValidate autoFocus>
                <InputGroup className="mb-3" hasValidation={!isValid}>
                  <FormControl
                    aria-label="body"
                    name="body"
                    value={values.body}
                    className={!isValid && 'is-invalid'}
                    onChange={handleChange}
                    autoFocus
                    data-testid="new-message"
                  />
                  <InputGroup.Append>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>{ t('buttons.send') }</Button>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">
                    { errors.body }
                  </Form.Control.Feedback>
                </InputGroup>
              </Form>
            )}

          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;
