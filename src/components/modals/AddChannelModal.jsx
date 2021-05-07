import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice.js';
import AddChannelForm from '../forms/AddChannelForm.jsx';

const AddChannel = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { open, currentModal } = useSelector((state) => state.modal);
  // const { socket } = useSocket();
  const handleCloseModal = () => () => {
    dispatch(closeModal());
  };

  const isOpened = () => open && currentModal === 'addChannel';

  return (
    <Modal
      show={isOpened()}
      onHide={handleCloseModal()}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          { t('titles.addChannel') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { isOpened() && <AddChannelForm socket={socket} dispatch={dispatch} t={t} /> }
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
