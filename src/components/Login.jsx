/* eslint-disable functional/no-this-expression */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import LoginForm from './forms/LoginForm.jsx';

// eslint-disable-next-line functional/no-class
const Login = () => {
  const history = useHistory();
  const { localStorage } = window;
  const { t } = useTranslation();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-md-4">
          <LoginForm history={history} storage={localStorage} t={t} />
        </div>
      </div>
    </div>
  );
};

export default Login;
