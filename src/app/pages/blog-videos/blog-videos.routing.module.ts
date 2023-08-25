import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BlogVideosListComponent } from './blog-videos-list/blog-videos-list.component';
import { BlogVideoDetailsComponent } from './blog-video-details/blog-video-details.component';
import { PermissionGuard } from '../../core/shared/guards/permission-guard.service';

const routes: Route[] = [
  {
    path: '',
    component: BlogVideosListComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'canViewBlogs' },
  },
  {
    path: 'add',
    component: BlogVideoDetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'canCreateBlogs' },
  },
  {
    path: 'edit/:id',
    component: BlogVideoDetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'canEditBlogs' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogVideosRoutingModule {}
