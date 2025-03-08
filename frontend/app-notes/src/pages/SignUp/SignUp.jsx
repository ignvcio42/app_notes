import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name){
      setError('El nombre es requerido');
      return;
    }

    if (!validateEmail(email)){
      setError('Email invalido');
      return;
    }

    if (!password){
      setError('La contraseña es requerida');
      return;
    }

    setError(null);

    // Aquí va la llamada a la API para hacer registro
  }

  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>Registro</h4>

            <input
              type="text"
              placeholder='Nombre'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>Crear cuenta</button>

            <p className='text-sm text-center mt-4'>
              Tienes una cuenta? {" "}
              <Link to="/login" className='font-medium text-primary underline'>
                Iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp