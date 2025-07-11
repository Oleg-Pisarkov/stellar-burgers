import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../services/slices/ingredientSlice';
import { Params, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredients);

  const { id } = useParams<Params>();
  /** TODO: взять переменную из стора */
  const ingredientData = ingredients.find((item) => {
    if (item._id === id) {
      return item;
    }
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
