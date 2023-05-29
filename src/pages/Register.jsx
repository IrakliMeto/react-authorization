import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { validateRegister } from '../validate/ValidateRegister';
import { useNavigate } from 'react-router-dom';

import Input from '../components/Input';

import { useFormik } from 'formik';

import './Form.scss';

export default function Register() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validate: validateRegister,

    onSubmit: (values) => {
      const myData = Cookies.get('formData');

      if (myData) {
        const myArr = JSON.parse(myData);

        for (let i = 0; i < myArr.length; i++) {
          if (myArr[i].email === values.email) {
            return setErrorMessage(true);
          }
        }
        setErrorMessage(false);

        Cookies.set('formData', JSON.stringify([...myArr, values]));
      } else {
        Cookies.set('formData', JSON.stringify([values]));
      }
      navigate('/react-authorization/login', { replace: true });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        id={'firstName'}
        type={'text'}
        placeholder={'First Name'}
        onChange={formik.handleChange}
        value={formik.values.firstName}
        error={formik.errors.firstName}
      />

      <Input
        id={'lastName'}
        type={'text'}
        placeholder={'Last Name'}
        onChange={formik.handleChange}
        value={formik.values.lastName}
        error={formik.errors.lastName}
      />

      <Input
        id={'email'}
        type={'email'}
        placeholder={'email address'}
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <Input
        id={'password'}
        type={'password'}
        placeholder={'password'}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Input
        id={'repeatPassword'}
        type={'password'}
        placeholder={'repeat password'}
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />

      {errorMessage ? <p className='error'>Email exist</p> : ''}
      <input className='submit' type='submit' value='Submit' />
    </form>
  );
}
