import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { PermissionGuard } from '../../core/shared/guards/permission-guard.service';

const routes: Route[] = [
  {
    path: '',
    component: MealsListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'canViewMeals',
    },
  },
  {
    path: 'edit/:id',
    component: MealEditComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'canEditMeals',
    },
  },
  {
    path: 'add',
    component: MealEditComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'canCreateMeals',
    },
  },
  {
    path: ':id',
    component: MealDetailsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'canViewMeals',
    },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
