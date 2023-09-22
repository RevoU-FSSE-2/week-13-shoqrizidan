import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import '../styles/Registration.css';

interface FormData {
  [key: string]: string;
  fullName: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [formData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>Registration</h1>
      <Formik
        initialValues={formData}
        validationSchema={Yup.object().shape({
          fullName: Yup.string().required('Full Name is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email Address is required'),
          password: Yup.string()
            .required('Password is required')
            .matches(
              /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              'Password must be at least 8 characters and alphanumeric'
            ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (Object.keys(values).some((key) => values[key] === '')) {
            setSubmitting(false);
          } else {
            try {
              const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                  name: values.fullName,
                  email: values.email,
                  password: values.password,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              };

              const response = await fetch('https://mock-api.arikmpt.com/api/user/register', requestOptions);

              if (response.ok) {
                const responseData = await response.json();
                console.log('Registration successful:', responseData);
                history.push('/thanks');
              } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }
        }}
      >
        <Form>
          <div className='form-field'>
            <label htmlFor="fullName">Full Name:</label>
            <Field as={Input} className='field' type="text" id="fullName" name="fullName" />
            <ErrorMessage name="fullName" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="email">Email Address:</label>
            <Field as={Input} className='field' type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="password">Password:</label>
            <Field as={Input} className='field' type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <Button className='sub-bt' type="primary" htmlType="submit">
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
