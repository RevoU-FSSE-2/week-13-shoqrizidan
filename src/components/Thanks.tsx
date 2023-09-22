import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import '../styles/Thanks.css'

const Thanks: React.FC = () => {
  const history = useHistory();

  const goToLoginPage = () => {
    history.push('/login');
  };

  return (
    <div className='container'>
      <br />
      <h1>Terimakasih Sudah Mendaftar</h1>
      <p className='p'>Sekarang Anda dapat Login untuk mengakses website.</p>
      <Button className='btn-to-login' type="primary" onClick={goToLoginPage}>
        Ke Halaman Login
      </Button>
    </div>
  );
};

export default Thanks;
