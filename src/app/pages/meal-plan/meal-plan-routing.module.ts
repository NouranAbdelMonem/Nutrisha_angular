import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PlanTemplatesListComponent } from './plan-templates-list/plan-templates-list.component';
import { UserMealPlanComponent } from './meal-plan/user-meal-plan.component';
import { PermissionGuard } from '../../core/shared/guards/permission-guard.service';

const routes: Route[] = [
  {
    path: 'templates',
    children: [
      {
        path: '',
        component: PlanTemplatesListComponent,
        pathMatch: 'full',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessMealPlansModule',
        },
      },
      {
        path: 'add',
        component: UserMealPlanComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'canCreateParentMealPlans',
        },
      },
      {
        path: 'user/:userId',
        component: PlanTemplatesListComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAssignMealPlanToAppUsers',
        },
      },
      {
        path: ':templateId/user/:userId/edit',
        component: UserMealPlanComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAssignMealPlanToAppUsers',
        },
      },
      {
        path: 'edit/:templateId',
        component: UserMealPlanComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'canCreateChildMealPlans',
        },
      },
    ],
  },
  {
    path: ':userId/add',
    component: UserMealPlanComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealPlanRoutingModule {}
