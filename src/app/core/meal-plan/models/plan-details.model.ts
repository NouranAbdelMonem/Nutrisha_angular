import { DayOfWeek } from '../../shared/models/day-of-week';
import { MealType } from '../../meals/models/meal-type.enum';
import { MealPlanViewModel } from './meal-plan-view.model';

export class PlanDetailsModel {
  id: string;
  created: Date;
  notes: string;
  templateName: string;
  isTemplate: boolean;
  planDays: PlanDay[];
  parentTemplates: string[];
}

export class PlanDay {
  id: string;
  day: DayOfWeek;
  planMeals: PlanMenu[];
}

export class PlanMenu {
  mealType: MealType;
  meals: { meal: { name: string; id: string } }[];
}

export function toViewModel(plan: PlanDetailsModel): MealPlanViewModel {
  if (!plan) return null;

  const viewModel = new MealPlanViewModel();
  Object.assign(viewModel, plan);

  for (const planDay of plan.planDays) {
    const day: any = {};

    for (const menu of planDay.planMeals) {
      day[MealType[menu.mealType]] = menu.meals.map((m) => ({
        id: m.meal.id,
        name: m.meal.name,
      }));
    }

    viewModel[planDay.day] = day;
  }

  return viewModel;
}
