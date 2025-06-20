import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserState } from 'src/services/slices/userSlice';

type TProtectedRoute = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: TProtectedRoute) => {
  const isAuthChecked = useSelector(getUserState).isAuthChecked;
  const isAuthenticated = useSelector(getUserState).isAuthenticated;
  const user = useSelector(getUserState).user;
  const location = useLocation();

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя , показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    //  если маршрут для неавторизованного пользователя, но пользователь авторизован
    // при обратном редиректе  получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть , если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  // return <Outlet />;
  return children;
};
