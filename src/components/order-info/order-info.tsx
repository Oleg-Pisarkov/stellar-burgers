import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients } from '../../services/slices/ingredientSlice';
import {
  getOrderByNumber,
  getOrderState
} from '../../services/slices/orderSlice';
import { AppDispatch } from 'src/services/store';

export const OrderInfo: FC = () => {
  const number = Number(useParams().number);
  const ingredients = useSelector(selectIngredients);
  const { orderByNumber, orderRequest } = useSelector(getOrderState);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByNumber(number));
  }, []);

  const orderInfo = useMemo(() => {
    if (!orderByNumber || !ingredients.length) return null;

    const date = new Date(orderByNumber.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderByNumber.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderByNumber,
      ingredientsInfo,
      date,
      total
    };
  }, [orderByNumber, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
