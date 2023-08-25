import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MobileUserListComponent } from './mobile-user-list/mobile-user-list.component';
import { MobileUserDetailsComponent } from './mobile-user-details/mobile-user-details.component';
import { PermissionGuard } from '../../core/shared/guards/permission-guard.service';

const route: Route[] = [
  {
    path: ':id',
    component: MobileUserDetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'canViewAppUsers' },
  },
  {
    path: '',
    component: MobileUserListComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'canViewAppUsers' },
  },
  {
    path: '**',
    component: MobileUserListComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'canViewAppUsers' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class MobileUserRoutingModule {}
