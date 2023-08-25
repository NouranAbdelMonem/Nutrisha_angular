export class MealPlanViewModel {
  [key: number]: {};
  id: string;
  created: Date;
  notes: string;
  templateName: string;
  isTemplate: boolean;
  createdBy: { id: string; name: string; personalImage: string };
  parentTemplates: string[];
  isUsedInAnotherMealPlan: boolean;
}
