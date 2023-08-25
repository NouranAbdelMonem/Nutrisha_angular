import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleDetailsComponent } from './role-details/role-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'all',
        component: RolesListComponent,
      },
      {
        path: 'details/:id',
        component: RoleDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'all',
      },
    ]),
  ],
})
export class RoleRoutingModule {}
