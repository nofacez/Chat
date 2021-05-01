import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useUser } from '../context/UserContext.jsx';
import routes from '../../routes.js';

const LoginForm = ({ history, storage, t }) => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const { logIn } = useUser();
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      initialStatus="form-control"
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        try {
          const { data: { username, token } } = await axios.post(routes.loginPath(), values);
          storage.setItem('user', JSON.stringify({ username, token }));
          logIn(username);
          actions.setStatus('form-control is-valid');
          history.push('/');
        } catch (e) {
          actions.setStatus('form-control is-invalid');
          console.error(e);
        }
      }}
    >
      {({
        handleChange, values, handleSubmit, status,
      }) => (
        <Form className="pt-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              { t('titles.login.username') }
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
              { t('titles.login.password') }
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
            {status.includes('is-invalid') && <div className="invalid-feedback">{ t('errors.loginFalied') }</div>}
          </div>
          <button className="btn btn-outline-primary btn-block mb-3" type="submit">
            { t('buttons.login') }
          </button>
          <div className="d-flex flex-column align-items-center">
            <span className="mb-2 small">{ t('titles.login.newUser') }</span>
            <a href="/signup">{ t('buttons.loginSignup') }</a>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
