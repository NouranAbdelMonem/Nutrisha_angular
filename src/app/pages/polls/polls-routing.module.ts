import { Route, RouterModule } from '@angular/router';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { NgModule } from '@angular/core';
import { PollsComponent } from './base/polls.component';
import { PollsListComponent } from './polls-list/polls-list.component';
import { PermissionGuard } from '../../core/shared/guards/permission-guard.service';

const routes: Route[] = [
  {
    path: '',
    component: PollsComponent,
    children: [
      {
        path: '',
        component: PollsListComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'canViewBlogs' },
      },
      {
        path: 'add',
        component: CreatePollComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'canCreateBlogs' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollRoutingModule {}
