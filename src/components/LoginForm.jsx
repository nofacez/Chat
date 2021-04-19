import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

const LoginForm = (props) => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  console.log(props);
  console.log(history);
  const { localStorage } = window;
  const { t } = useTranslation();
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-md-4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              console.log(values);
              try {
                const response = await axios.post('/api/v1/login', values);
                const { data: { token, username } } = response;
                localStorage.setItem(username, token);
                history.push('/');
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {({ handleChange, values, handleSubmit }) => (
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
                    className="form-control"
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
                    className="form-control"
                    required
                  />
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
