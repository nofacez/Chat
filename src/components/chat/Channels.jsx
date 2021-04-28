import React from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';
import { useTranslation } from 'react-i18next';

import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalSlice.js';

const Channels = ({ channels, currentChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleChangeChannel = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };
  const handleOpenModal = (type) => () => {
    dispatch(openModal({ type }));
  };
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>
          { t('titles.channels') }
        </span>
        <button type="button" className="ml-auto p-0 btn btn-lik" onClick={handleOpenModal('addChannel')}>+</button>
      </div>
      <ul className="nav flex-column nav-pills">
        { channels.map(({ id, name, removable }) => (
          <li className="nav-item" key={uniqueId()}>
            {
            removable
              ? (
                <Dropdown as={ButtonGroup} className="d-flex mb-2">
                  <Button variant={id === currentChannelId ? 'primary' : 'light'} className="flex-grow-1 text-left nav-link" onClick={handleChangeChannel(id)}>
                    {name}
                  </Button>

                  <Dropdown.Toggle split variant={id === currentChannelId ? 'primary' : 'light'} id="dropdown-split-basic" className="flex-grow-0" />

                  <Dropdown.Menu>
                    <Dropdown.Item href="">{t('buttons.delete')}</Dropdown.Item>
                    <Dropdown.Item href="">{t('buttons.rename')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
              : (
                <button
                  type="button"
                  className={`nav-link btn-block mb-2 text-left btn btn-primary ${id === currentChannelId ? 'btn-primary' : 'btn-light'}`}
                  onClick={handleChangeChannel(id)}
                >
                  {name}
                </button>
              )
          }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
