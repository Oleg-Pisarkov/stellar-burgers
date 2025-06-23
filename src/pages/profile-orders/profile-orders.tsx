import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { get } from 'http';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from '../../services/slices/feedSlice';
import { getOrders, getUserState } from '../../services/slices/userSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getUserState).userOrders;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getFeeds());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
