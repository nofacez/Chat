import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import SignupForm from './forms/SignUpForm.jsx';

const SignUp = () => {
  const { t } = useTranslation();
  const { localStorage } = window;
  const history = useHistory();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-md-4">
          <SignupForm t={t} storage={localStorage} history={history} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
