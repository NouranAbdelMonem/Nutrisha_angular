import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { PermissionGuard } from '../../core/shared/guards/permission-guard.service';

const routes: Route[] = [
  {
    path: 'all',
    component: AdminUsersListComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'canViewAdminUsers' },
  },
  {
    path: 'add',
    component: AdminUserDetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'canCreateAdminUsers' },
  },
  {
    path: 'edit/:id',
    component: AdminUserDetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'canEditAdminUsers' },
  },
  {
    path: '',
    redirectTo: 'all',
    canActivate: [PermissionGuard],
    data: { permission: 'canViewAdminUsers' },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
