import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)){
      setError('Email invalido');
      return;
    }

    if (!password){
      setError('La contraseña es requerida');
      return;
    }

    setError(null);

    // Aquí va la llamada a la API para hacer login

    try {
      const response = await axiosInstance.post('/login', { email: email, password: password });

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');        
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al iniciar sesión');
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>

            <input 
              type="text" 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>Iniciar sesión</button>

            <p className='text-sm text-center mt-4'>
              No estas registrado? {" "}
              <Link to="/SignUp" className='font-medium text-primary underline'>
                Crear una cuenta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login