import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { closeModal } from '../../slices/modalSlice.js';

const RenameForm = ({ socket, t, dispatch }) => {
  const { channels } = useSelector((state) => state.channelsInfo);
  const { extra } = useSelector((state) => state.modal);
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

  const handleRenameChannel = ({ name }) => {
    socket.emit('renameChannel', { id: extra.id, name }, ({ status }) => {
      console.log(status);
    });
  };

  const channel = channels.find((c) => c.id === extra.id);

  return (
    <Formik
      validationSchema={schema}
      validateOnChange={false}
      enableReinitialize
      initialValues={{
        name: channel.name,
      }}
      onSubmit={(values) => {
        handleRenameChannel(values);
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
        console.log('errr', errors);
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

export default RenameForm;