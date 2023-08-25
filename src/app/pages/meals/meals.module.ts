import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealsState } from '../../core/store/meals/meals.state';
import { NgxsModule } from '@ngxs/store';
import { MealService } from '../../core/meals/meal.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MealEditComponent, MealsListComponent, MealDetailsComponent],
  exports: [],
  imports: [
    CommonModule,
    MealsRoutingModule,
    MatPaginatorModule,
    TranslateModule,
    NgxsModule.forFeature([MealsState]),
    NgxPermissionsModule.forChild(),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [MealService],
})
export class MealsModule {}
