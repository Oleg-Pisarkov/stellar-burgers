import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConstructorState,
  orderBurger,
  resetModal,
  setRequest
} from '../../services/slices/constructorSlice';
import { getUserState } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { constructorItems, orderRequest, orderModalData } =
    useSelector(getConstructorState);
  const isAuth = useSelector(getUserState).isAuthenticated;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  if (!constructorItems) {
    return null;
  }

  let arr: string[] = [];

  const ingredients: string[] | void = constructorItems.ingredients.map(
    (item) => item._id
  );

  if (constructorItems.bun) {
    const bun = constructorItems.bun._id;
    arr = [bun, ...ingredients, bun];
  }

  const onOrderClick = () => {
    if (isAuth && constructorItems.bun && !orderRequest) {
      dispatch(setRequest(true));
      dispatch(orderBurger(arr));
    } else if (!isAuth) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
