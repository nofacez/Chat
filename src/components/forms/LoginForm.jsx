import React from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useUser } from '../context/UserContext.jsx';
import routes from '../../routes.js';
import RollbarContext from '../context/RollbarContext.js';

const LoginForm = ({ t }) => {
  const schema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
  });
  const { logIn } = useUser();
  const rollbar = React.useContext(RollbarContext);
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
          const { data } = await axios.post(routes.loginPath(), values);
          console.log(data);
          logIn(data);
          window.location.assign('/');
          // history.push('/');
        } catch (e) {
          actions.setFieldError('password', t('errors.loginFalied'));
          console.log('er', e);
          rollbar.error(e);
        }
      }}
    >
      {({
        handleChange, values, handleSubmit, isSubmitting, errors,
      }) => (
        <Form className="pt-2" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">
              { t('titles.login.username') }
            </Form.Label>
            <Form.Control
              id="username"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              value={values.username}
              className={errors.password && 'is-invalid'}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">
              { t('titles.login.password') }
            </Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={values.password}
              className={errors.password && 'is-invalid'}
              required
            />
            <Form.Control.Feedback type="invalid">
              { errors.password }
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="outline-primary" block type="submit" className="mb-3" disabled={isSubmitting}>
            { t('buttons.login') }
          </Button>
          <div className="d-flex flex-column align-items-center">
            <span className="mb-2 small">{ t('titles.login.newUser') }</span>
            <Link to="/signup">{ t('buttons.loginSignup') }</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
