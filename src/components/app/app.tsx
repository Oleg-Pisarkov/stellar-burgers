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
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice';
import { AppDispatch } from 'src/services/store';
import { getIngredients } from '../../services/slices/ingredientSlice';
import { ProtectedRoute } from '../Protected Route/protected route';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={locationState?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={<ProtectedRoute children={<Login />} onlyUnAuth />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute children={<Register />} onlyUnAuth />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute children={<ForgotPassword />} onlyUnAuth />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute children={<Profile />} onlyUnAuth={false} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute children={<ProfileOrders />} onlyUnAuth />}
        />

        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {locationState?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`${location.pathname.split('/feed/')[1]}`}
                onClose={() => navigate(-1)}
              >
                {' '}
                <OrderInfo />{' '}
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute
                children={
                  <Modal
                    title={'Детали ингредиента'}
                    onClose={() => navigate(-1)}
                  >
                    <ProfileOrders />
                  </Modal>
                }
                onlyUnAuth={false}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                children={
                  <Modal
                    title={`${location.pathname.split('/profile/orders/')[1]}`}
                    onClose={() => navigate(-1)}
                  >
                    <OrderInfo />
                  </Modal>
                }
                onlyUnAuth={false}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
