import React from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>
        { t('login.nickname') }
      </h1>
      <h1>
        { t('login.password') }
      </h1>
    </div>
  );
};

export default Login;
