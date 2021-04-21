/* eslint-disable functional/no-this-expression */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useUser } from './UserContext.jsx';

// eslint-disable-next-line functional/no-class
const LoginForm = () => {
  const history = useHistory();
  const { localStorage } = window;
  console.log('1', localStorage);
  const { t } = useTranslation();
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const { user, logIn } = useUser();
  console.log('before', user);
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-md-4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            initialStatus="form-control"
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              try {
                const response = await axios.post('/api/v1/login', values);
                const { data: { username, token } } = response;
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify({ username, token }));
                logIn(username);
                actions.setStatus('form-control is-valid');
                history.push('/');
                console.log('after', user);
              } catch (e) {
                console.log('after', user);
                actions.setStatus('form-control is-invalid');
                console.log(e);
              }
            }}
          >
            {({
              handleChange, values, handleSubmit, status,
            }) => (
              <Form className="pt-2" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    { t('login.username') }
                  </label>
                  <Field
                    id="username"
                    name="username"
                    autoComplete="username"
                    onChange={handleChange}
                    value={values.username}
                    className={status}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    { t('login.password') }
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={values.password}
                    className={status}
                    required
                  />
                  {status.includes('is-invalid') && <div className="invalid-feedback">{ t('login.wrongPassAndUsernameError') }</div>}
                </div>
                <button className="btn btn-outline-primary btn-block" type="submit">
                  { t('login.enterButton') }
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
