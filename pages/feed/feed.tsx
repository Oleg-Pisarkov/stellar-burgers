import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds, getFeedState } from '../../services/slices/feedSlice';
import { AppDispatch } from 'src/services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedState).orders;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
