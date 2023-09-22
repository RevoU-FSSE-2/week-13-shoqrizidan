import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

interface LoginFormValues {
  [key: string]: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch('https://mock-api.arikmpt.com/api/user/login', requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login berhasil:', responseData);
        history.push('/category');
      } else {
        const errorData = await response.json();
        console.error('Login gagal:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={formData}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email tidak valid')
            .required('Email diperlukan'),
          password: Yup.string().required('Password diperlukan'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (Object.keys(values).some((key) => values[key] === '')) {
            setSubmitting(false);
          } else {
            setFormData({ ...formData, ...values });
            handleLogin(values);
          }
        }}
      >
        <Form>
          <div className='form-field'>
            <label htmlFor="email">Alamat Email:</label>
            <Field as={Input} className='field' type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="password">Password:</label>
            <Field as={Input} className='field' type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <Button className='sub-bt' type="primary" htmlType="submit" onClick={() => handleLogin(formData)}
           >Login
          </Button>

          <br />
          <br />
          <p>
            Belum memiliki akun?<br /><br />
            <Button className='btn-to-register'>
              Registrasi
            </Button>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
