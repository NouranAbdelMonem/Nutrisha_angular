import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import {
  IngredientUnitType,
  MealDetailsModel,
} from '../../../core/meals/models/meal-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MealsActions } from '../../../core/store/meals/meals.action';
import { MealsState } from '../../../core/store/meals/meals.state';
import { MealListModel } from '../../../core/meals/models/meal-list.model';
import { MealType } from '../../../core/meals/models/meal-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../core/shared/confirm-dialog/confirm-dialog.component';
import { MealService } from '../../../core/meals/meal.service';

@UntilDestroy()
@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
})
export class MealDetailsComponent implements OnInit {
  mealType = MealType;
  mealId: string;
  ingredientUnitType = IngredientUnitType;

  @Select(MealsState.lastLoadedMeal)
  mealDetails$: Observable<MealDetailsModel>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const id = params['id'];
        this.mealId = id;

        if (id) {
          this.store.dispatch(new MealsActions.LoadMealDetails(id));
        }
      });
  }

  deleteMeal() {
    this.matDialog
      .open(ConfirmDialogComponent, {})
      .afterClosed()
      .pipe(
        switchMap((d) => {
          if (d) {
            return this.mealService
              .delete(this.mealId)
              .pipe(tap((r) => this.router.navigateByUrl('meals')));
          }

          return of(false);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  editMeal() {
    this.router.navigate([], { relativeTo: this.activatedRoute });
    this.router.navigateByUrl(`meals/edit/${this.mealId}`);
  }
}
