import { PagedListQueryModel } from '../../shared';

export namespace MealsActions {
  export class LoadMealsPage {
    public static type = '[Meals] Load Meals';

    constructor(public queryParams: PagedListQueryModel) {}
  }

  export class LoadMealDetails {
    public static type = '[Meals] Load Meal Details';

    constructor(public id: string) {}
  }
}
