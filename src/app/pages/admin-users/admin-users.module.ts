import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUsersRoutingModule } from './admin-users.routing.module';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoleService } from '../../core/roles/role.service';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [AdminUsersListComponent, AdminUserDetailsComponent],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
    MatStepperModule,
    MatTabsModule,
    MatSelectModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPermissionsModule,
  ],
  providers: [RoleService],
})
export class AdminUsersModule {}
