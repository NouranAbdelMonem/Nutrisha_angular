import { MealType } from './meal-type.enum';

export class MealDetailsModel {
  id: string;
  name: string;
  mealType: MealType = MealType.Breakfast;
  coverImage: string;
  preparingTime: string;
  cockingTime: string;
  ingredients: IngredientModel[];
  mealSteps: string;
  allergies: string;
  canEdit: boolean;
}

export class IngredientModel {
  quantity: number;
  unitType: IngredientUnitType;
  ingredientName: string;
}
export enum IngredientUnitType {
  Liter,
  Cup,
  Tbs,
  Tsp,
  Kg,
  Gram,
  Slice,
  Piece,
}

export const ingredientUnitTypeKeys = [
  'Liter',
  'Cup',
  'Tbs',
  'Tsp',
  'Kg',
  'Gram',
  'Slice',
  'Piece',
];
