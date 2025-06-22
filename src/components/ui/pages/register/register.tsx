import { FC, useState } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUIProps } from './type';
import { useDispatch } from 'react-redux';
import { registerUserApi } from '@api';
import { registerUser } from '../../../../services/slices/userSlice';
import { AppDispatch } from 'src/services/store';
//12312312 123 123  22 1
//21 21 12 12
export const RegisterUI: FC<RegisterUIProps> = () => {
  const [errorText, setErrorText] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await dispatch(
      registerUser({ email, password, name: userName })
    );
    if (registerUser.fulfilled.match(data)) {
      navigate('/');
    } else {
      data.error.message && setErrorText(data.error.message);
    }
  };
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
        <form
          className={`pb-15 ${styles.form}`}
          name='register'
          onSubmit={handleSubmit}
        >
          <>
            <div className='pb-6'>
              <Input
                type='text'
                placeholder='Имя'
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                name='name'
                error={false}
                errorText=''
                size='default'
              />
            </div>
            <div className='pb-6'>
              <Input
                type='email'
                placeholder='E-mail'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name={'email'}
                error={false}
                errorText=''
                size={'default'}
              />
            </div>
            <div className='pb-6'>
              <PasswordInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name='password'
              />
            </div>
            <div className={`pb-6 ${styles.button}`}>
              <Button type='primary' size='medium' htmlType='submit'>
                Зарегистрироваться
              </Button>
            </div>
            {errorText && (
              <p className={`${styles.error} text text_type_main-default pb-6`}>
                {errorText}
              </p>
            )}
          </>
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Уже зарегистрированы?
          <Link to='/login' className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
