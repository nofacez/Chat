import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { closeModal } from '../../slices/modalSlice.js';
// import { setCurrentChannel } from '../../slices/channelsSlice.js';
import useSocket from '../context/useSocket.js';

const AddChannelForm = ({ t, dispatch }) => {
  const { channels } = useSelector((state) => state.channelsInfo);
  const socket = useSocket();
  const channelsNames = channels.map(({ name }) => name);
  const schema = yup.object().shape({
    name: yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .notOneOf(channelsNames, t('errors.unique')),
  });

  const handleCloseModal = () => () => {
    dispatch(closeModal());
  };

  return (
    <Formik
      validationSchema={schema}
      validateOnChange={false}
      initialValues={{
        name: '',
      }}
      onSubmit={(values) => {
        socket.addChannel(values);
        dispatch(closeModal());
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        isSubmitting,
      }) => {
        const inputClasses = cn(
          'mb-2',
          { 'is-invalid': !isValid },
        );
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name="name"
                aria-label="add channel"
                className={inputClasses}
                value={values.name}
                onChange={handleChange}
                autoFocus
                data-testid="add-channel"
              />
              <Form.Control.Feedback type="invalid">
                { errors.name }
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="mr-2" onClick={handleCloseModal()}>
                { t('buttons.cancel') }
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                { t('buttons.send') }
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddChannelForm;
