import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticlesComponent } from './base/articles.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { PermissionGuard } from '../../core/shared/guards/permission-guard.service';

const routes: Route[] = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      {
        path: '',
        component: ArticlesListComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'canViewBlogs' },
      },
      {
        path: 'add',
        canActivate: [PermissionGuard],
        data: { permission: 'canCreateBlogs' },
        component: CreateArticleComponent,
      },
      {
        path: 'edit/:id',
        component: CreateArticleComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'canEditBlogs' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
