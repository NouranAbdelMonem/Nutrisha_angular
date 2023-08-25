import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { RolesListComponent } from './roles-list/roles-list.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoleService } from '../../core/roles/role.service';
import { RoleDetailsComponent } from './role-details/role-details.component';

@NgModule({
  declarations: [RolesListComponent, RoleDetailsComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MatTableModule,
    SharedModule,
    TranslateModule,
    MatPaginatorModule,
  ],
  providers: [RoleService],
})
export class RolesModule {}
