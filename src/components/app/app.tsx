import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice';
import { AppDispatch } from 'src/services/store';
import { getIngredients } from '../../services/slices/ingredientSlice';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={`${location.pathname.split('/feed/')[1]}`}
              onClose={history.back}
            >
              {' '}
              <OrderInfo />{' '}
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Детали ингредиента'} onClose={history.back}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='123' onClose={history.back}>
              {' '}
              <OrderInfo />{' '}
            </Modal>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
