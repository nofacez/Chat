import React from 'react';
import {
  InputGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import useSocket from '../context/useSocket.js';

const MessagesForm = ({ user }) => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const socket = useSocket();
  const schema = yup.object().shape({
    body: yup.string().required(t('errors.emptyMessage')),
  });
  // const handleSubmitMsg = (text) => {
  //   if (socket.disconnected) {
  //     throw new Error('Socket is disconnected!');
  //   }
  //   const msg = { username: user.username, body: text, channelId: currentChannelId };
  //   socket.sendMessage(msg);
  // };

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{
          body: '',
        }}
        validateOnChange={false}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          try {
            const msg = { username: user.username, body: values.body, channelId: currentChannelId };
            socket.sendMessage(msg);
            actions.resetForm();
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {({
          values, handleChange, handleSubmit, errors, isValid, isSubmitting,
        }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            noValidate
            autoFocus
          >
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
              { errors.body
                && (
                <Form.Control.Feedback type="invalid">
                  { errors.body }
                </Form.Control.Feedback>
                )}
            </InputGroup>
          </Form>
        )}

      </Formik>
    </div>
  );
};

export default MessagesForm;
