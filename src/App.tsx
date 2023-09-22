import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import revouLogo from './assets/revou.png'
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import RegistrationForm from './components/Registration';
import Login from './components/Login';
import Category from './components/Category';
import Thanks from './components/Thanks';
import { Button } from 'antd';
import './styles/App.css';

const Home = () => {
  return (
    <>
      <h2 className='h2'>Hallo, Selamat Datang.</h2>
      <p>Sebelum menggunakan website, harap login terlebih dahulu.</p>
      <Link className="container" to="/login">
        <Button href='/login' className="btn">Login</Button>
      </Link>
      <p>Jika kamu belum memiliki akun, harap registrasi terlebih dahulu.</p>
      <Link className="container" to="/registration">
        <Button href='/registration' className="btn">Registrasi</Button>
      </Link>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="top">
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://revou.co/" target="_blank" rel="noopener noreferrer">
            <img src={revouLogo} className="logo revou" alt="Revou logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Shoqri Zidan - Week 13 Assignment</h1>
        <p className='p'>
          Advanced Frontend
          <br />
          Using Vite + React
        </p>
      </div>
      <div className="App">
        <Switch>
          <Route path="/registration" component={RegistrationForm} />
          <Route path="/thanks" component={Thanks} ></Route>
          <Route path="/login" component={Login} />
          <Route path="/category" component={Category} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
