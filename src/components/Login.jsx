import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const { t } = useTranslation();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-md-4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={(values) => {
              console.log(values);
              try {
                schema.validateSync(values);
                console.log(values);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {(props) => (
              <Form className="pt-2">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    { t('login.username') }
                  </label>
                  <Field
                    id="username"
                    name="username"
                    autoComplete="username"
                    onChange={props.handleChange}
                    value={props.values.username}
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
                    onChange={props.handleChange}
                    value={props.values.password}
                    className="form-control"
                    required
                  />
                </div>
                <button className="btn btn-outline-primary btn-block" type="submit" onSubmit={props.handleSubmit}>
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

export default Login;
