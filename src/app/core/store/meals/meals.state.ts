import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MealListModel } from '../../meals/models/meal-list.model';
import { MealService } from '../../meals/meal.service';
import { tap } from 'rxjs';
import { MealsActions } from './meals.action';
import { MealDetailsModel } from '../../meals/models/meal-details.model';
import { MealType } from '../../meals/models/meal-type.enum';

interface MealStateModel {
  meals: MealListModel[];
  totalRows: number;
  lastLoadedMeal: MealDetailsModel;
}

@Injectable()
@State<MealStateModel>({
  name: 'meals',
})
export class MealsState {
  constructor(private mealService: MealService) {}

  @Action(MealsActions.LoadMealsPage)
  getPagedList(
    ctx: StateContext<MealStateModel>,
    action: MealsActions.LoadMealsPage
  ) {
    return this.mealService.getPagedList(action.queryParams).pipe(
      tap((result) => {
        const data = result.data;
        ctx.setState({
          ...ctx.getState(),
          meals: data,
          totalRows: result.totalRows,
          lastLoadedMeal: null,
        });
      })
    );
  }

  @Action(MealsActions.LoadMealDetails)
  loadMealDetails(
    ctx: StateContext<MealStateModel>,
    action: MealsActions.LoadMealDetails
  ) {
    return this.mealService.getById(action.id).pipe(
      tap((result) => {
        const data = result.data;
        ctx.setState({
          ...ctx.getState(),
          lastLoadedMeal: data,
          totalRows: 0,
          meals: null,
        });
      })
    );
  }

  @Selector()
  static lastPage(state: MealStateModel) {
    return state.meals;
  }

  @Selector()
  static totalRows(state: MealStateModel) {
    return state.totalRows;
  }

  @Selector()
  static lastLoadedMeal(state: MealStateModel) {
    return state.lastLoadedMeal;
  }
}
