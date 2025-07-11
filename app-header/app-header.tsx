import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUser, getUserState } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const data = useSelector(getUserState).userData;
  return <AppHeaderUI userName={data ? data.name : ''} />;
};
