import React from 'react';
import { uniqueId } from 'lodash';
import {
  InputGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const Messages = ({
  messages, currentChannelId, socket, user,
}) => {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    body: yup.string().required(t('errors.emptyMessage')),
  });

  const handleSubmitMsg = (text) => {
    try {
      socket.emit('newMessage', { username: user.username, body: text, channelId: currentChannelId }, (data) => console.log(data.status));
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
          <Formik
            initialValues={{
              body: '',
            }}
            validateOnChange={false}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              console.log(values);
              handleSubmitMsg(values.body);
              actions.resetForm();
            }}
          >
            {({
              values, handleChange, handleSubmit, errors, isValid,
            }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <InputGroup className="mb-3" hasValidation={!isValid}>
                  <FormControl
                    aria-label="body"
                    name="body"
                    value={values.body}
                    className={!isValid && 'is-invalid'}
                    onChange={handleChange}
                    autoFocus
                  />
                  <InputGroup.Append>
                    <Button type="submit" variant="primary">{ t('buttons.send') }</Button>
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
