import { MobileUserListModel } from './mobile-user-list-model';
import { TotalsModel } from '../../shared';
import { MealPlan } from './user-plan.day';

export interface UserPlanTemplateModel {
  startDate: Date;
  templateName: string;
}

export class MobileUserDetailsViewModel extends MobileUserListModel {
  totals: TotalsModel;
  allergies: string[];
  dislikes: string[];
  gender: string;
  age: number;
  height: number;
  currentWeight: number;
  weightLoss: number;

  userRisks: string[];
  currentPlan;
  previousPlan;
  lastUsedTemplates: UserPlanTemplateModel[];

  isBanned: boolean;

  constructor(model: MobileUserDetailsModel) {
    super();
    this.currentPlan = planToViewModel(model.userMealPlans?.lastPlan);
    this.previousPlan = planToViewModel(model.userMealPlans?.previousPlan);
    Object.assign(this, model);
  }
}

export class MobileUserDetailsModel extends MobileUserListModel {
  totals: TotalsModel;
  allergies: string[];
  dislikes: string[];

  gender: string;
  age: number;
  height: number;
  currentWeight: number;
  weightLoss: number;
  isBanned: boolean;
  userMealPlans: {
    lastPlan: MealPlan;
    previousPlan: MealPlan;
  };
  lastUsedTemplates: UserPlanTemplateModel[];
  userRisks: string[];
}

function planToViewModel(mealPlan: MealPlan) {
  if (mealPlan == null) return null;
  const planDays = mealPlan.days;
  const plan: any = {
    notes: mealPlan.notes,
    numberOfIAmHungryClicked: mealPlan.numberOfIAmHungryClicked,
  };
  for (let day of planDays) {
    const planDay = {
      water: day.waterCount,
      mens: {},
    };

    for (let mealMenu of day.menus) {
      planDay.mens[mealMenu.mealType] = {
        isEaten: mealMenu.isEaten,
        isSkipped: mealMenu.isSkipped,
        isSwapped: mealMenu.isSwapped,
        mealNames: mealMenu.meals,
      };
    }

    plan[day.day] = planDay;
  }

  return plan;
}
