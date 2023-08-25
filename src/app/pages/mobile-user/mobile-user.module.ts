import { NgModule } from '@angular/core';
import { MobileUserService } from '../../core/mobile-users';

import { MobileUserListComponent } from './mobile-user-list/mobile-user-list.component';
import { CommonModule } from '@angular/common';
import { MobileUserRoutingModule } from './mobile-user.routing.module';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';
import { MobileUserState } from '../../core/store/mobile-users/mobile-user.state';
import { MobileUserDetailsComponent } from './mobile-user-details/mobile-user-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../shared/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgxPermissionsModule,
  NgxPermissionsRestrictStubModule,
} from 'ngx-permissions';
import { MealPlanModule } from '../meal-plan/meal-plan.module';
import { MealService } from '../../core/meals/meal.service';
import { MealPlanService } from '../../core/meal-plan/meal-plan.service';
import { MobileUserMoreInfoDialogComponent } from './mobile-user-details/sub/mobile-user-more-info-dialog/mobile-user-more-info-dialog.component';
import { MakePremiumComponent } from './mobile-user-details/sub/make-premium/make-premium.component';

@NgModule({
  declarations: [
    MobileUserListComponent,
    MobileUserDetailsComponent,
    MobileUserMoreInfoDialogComponent,
    MakePremiumComponent,
  ],
  imports: [
    CommonModule,
    MobileUserRoutingModule,
    MatTableModule,
    NgxsModule.forFeature([MobileUserState]),
    MaterialModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    NgxPermissionsModule,
    MealPlanModule,
    ReactiveFormsModule,
    NgxPermissionsRestrictStubModule,
  ],
  providers: [MobileUserService],
})
export class MobileUserModule {}
