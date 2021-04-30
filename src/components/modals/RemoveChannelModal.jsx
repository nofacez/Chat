import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { closeModal } from '../../slices/modalSlice.js';

const RemoveChannelModal = () => {
  const socket = io('http://localhost:5000');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { open, currentModal, extra } = useSelector((state) => state.modal);

  const handleCloseModal = () => () => {
    dispatch(closeModal());
  };

  const removeChannel = () => {
    socket.emit('removeChannel', extra, (resp) => console.log(resp));
  };

  return (
    <Modal
      show={open && currentModal === 'removeChannel'}
      onHide={handleCloseModal()}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{ t('titles.removeChannel') }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { t('titles.sure') }
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleCloseModal()}>
          { t('buttons.cancel') }
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            removeChannel();
            dispatch(closeModal());
          }}
        >
          { t('buttons.delete') }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
