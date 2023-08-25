import { DayOfWeek } from '../../shared/models/day-of-week';

export interface MealPlan {
  notes: string;
  days: UserPlanDay[];
  numberOfIAmHungryClicked: number;
}
export interface PlanDayMenu {
  isEaten: boolean;
  isSkipped: boolean;
  isSwapped: boolean;
  mealType: number;
  meals: string[];
}

export class UserPlanDay {
  day: DayOfWeek;
  waterCount: number;
  menus: PlanDayMenu[];
}
