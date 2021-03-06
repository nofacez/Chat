import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice.js';
import RenameForm from '../forms/RenameForm.jsx';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { open, currentModal } = useSelector((state) => state.modal);
  // const { socket } = useSocket();

  const handleCloseModal = () => () => {
    dispatch(closeModal());
  };

  const isOpened = () => open && currentModal === 'renameChannel';

  return (
    <Modal
      show={isOpened()}
      onHide={handleCloseModal()}
      centered
      enforceFocus
      restoreFocus
    >
      <Modal.Header closeButton>
        <Modal.Title>
          { t('titles.addChannel') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { isOpened() && <RenameForm t={t} dispatch={dispatch} /> }
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
