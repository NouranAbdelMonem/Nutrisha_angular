export enum MealType {
  Breakfast = 0,
  Lunch = 1,
  Dinner = 2,
  Snacks = 3,
  Supplements = 4,
  Water = 5,
  ExtraBites = 6,
  Recommended = 7,
}

export const getMealTypeByKey = (key: string) => {
  const firstLetter = key[0].toUpperCase();
  return MealType[firstLetter + key.substring(1)];
};

export const mealTypes: MealType[] = [
  MealType.Breakfast,
  MealType.Lunch,
  MealType.Dinner,
  MealType.Snacks,
  MealType.Supplements,
  MealType.Recommended,
];
