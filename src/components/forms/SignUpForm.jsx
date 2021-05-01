import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { useUser } from '../context/UserContext.jsx';
import routes from '../../routes.js';

const SignUpForm = ({ history, storage, t }) => {
  const schema = yup.object().shape({
    username: yup.string().required(t('errors.required')).min(3, t('errors.length')).max(20, t('errors.length')),
    password: yup.string().required(t('errors.required')).min(6, t('errors.passwordLength')),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('errors.confirmation')),
  });
  const { logIn } = useUser();
  const [state, setState] = useState(true);
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validateOnBlur={state}
      validateOnChange={state}
      initialStatus=""
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        try {
          const { username, password } = values;
          const { data } = await axios.post(routes.signupPath(), { username, password });
          storage.setItem('user', JSON.stringify({ username: data.username, token: data.token }));
          logIn(username);
          history.push('/');
        } catch (e) {
          if (e.response.status === 409) {
            setState(false);
            actions.setFieldError('confirmPassword', t('errors.userExists'));
            actions.setStatus('invalid');
            return;
          }
          console.error(e);
        }
      }}
    >
      {({
        handleChange,
        values,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        status,
      }) => {
        console.log(errors);
        const defineState = (name) => {
          if (errors[name] && touched[name]) {
            return 'is-invalid';
          }
          if (status === 'invalid') {
            return 'is-invalid';
          }
          return null;
        };
        return (
          <Form className="pt-2" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">
                { t('titles.signup.username') }
              </Form.Label>
              <Form.Control
                id="username"
                placeHolder={t('errors.length')}
                name="username"
                autoComplete="username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                className={defineState('username')}
                required
              />
              <Form.Control.Feedback type="invalid">
                { errors.username }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">
                { t('titles.signup.password') }
              </Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeHolder={t('errors.passwordLength')}
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={defineState('password')}
                required
              />
              <Form.Control.Feedback type="invalid">
                { errors.password }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">
                { t('titles.signup.confirmPassword') }
              </Form.Label>
              <Form.Control
                type="password"
                id="confirmPassword"
                placeHolder={t('errors.confirmation')}
                name="confirmPassword"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className={defineState('confirmPassword')}
                required
              />
              <Form.Control.Feedback type="invalid">
                { errors.confirmPassword }
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="outline-primary" block type="submit" disabled={isSubmitting}>
              { t('buttons.signup') }
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
