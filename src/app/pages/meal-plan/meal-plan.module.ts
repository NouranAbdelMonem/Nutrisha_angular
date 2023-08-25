import { NgModule } from '@angular/core';
import { MealPlanAddAsTemplateComponent } from './meal-plan-add-as-template/meal-plan-add-as-template.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlanTemplatesListComponent } from './plan-templates-list/plan-templates-list.component';
import { MealPlanRoutingModule } from './meal-plan-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MealPlanService } from '../../core/meal-plan/meal-plan.service';
import { UserMealPlanComponent } from './meal-plan/user-meal-plan.component';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MealService } from '../../core/meals/meal.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    MealPlanAddAsTemplateComponent,
    PlanTemplatesListComponent,
    UserMealPlanComponent,
  ],
  imports: [
    CommonModule,
    MealPlanRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    SharedModule,
    MatTableModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [MealPlanService, MealService],
  exports: [MealPlanAddAsTemplateComponent],
})
export class MealPlanModule {}
