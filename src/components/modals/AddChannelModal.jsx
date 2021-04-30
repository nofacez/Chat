import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import cn from 'classnames';
import { io } from 'socket.io-client';
import * as yup from 'yup';
import { closeModal } from '../../slices/modalSlice.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';

const AddChannel = () => {
  const socket = io('http://localhost:5000');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsInfo);
  const { open, currentModal } = useSelector((state) => state.modal);
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

  const submitNewChannel = (name) => {
    socket.emit('newChannel', name, ({ status, data }) => {
      dispatch(setCurrentChannel(data));
      console.log(status);
    });
  };

  return (
    <Modal
      show={open && currentModal === 'addChannel'}
      onHide={handleCloseModal()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          { t('titles.addChannel') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          validateOnChange={false}
          initialValues={{
            name: '',
          }}
          onSubmit={(values) => {
            submitNewChannel(values);
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
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
