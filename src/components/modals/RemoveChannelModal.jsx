import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice.js';
import useSocket from '../context/useSocket.js';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const { open, currentModal, extra } = useSelector((state) => state.modal);
  // const { socket } = useSocket();

  const handleCloseModal = () => () => {
    dispatch(closeModal());
  };

  // const removeChannel = () => {
  //   socket.emit('removeChannel', extra, (resp) => console.log(resp));
  // };

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
            socket.removeChannel(extra);
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
