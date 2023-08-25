import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { BaseComponent } from './pages/base/base.component';
import { PermissionGuard } from './core/shared/guards/permission-guard.service';
import { NoAccessComponent } from './core/shared/no-access/no-access.component';

const routes: Routes = [
  {
    path: 'privacy',
    loadChildren: () =>
      import('./pages/privacy/privacy.module').then((m) => m.PrivacyModule),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./pages/terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'faqs',
    loadChildren: () =>
      import('./pages/faqs/faqs.module').then((m) => m.FaqsModule),
  },
  {
    path: 'references',
    loadChildren: () =>
      import('./pages/references-and-resources/references-and-resources.module').then((m) => m.ReferencesAndResourcesModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/polls/poll.module').then((m) => m.PollModule),
      },
      {
        path: 'polls',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessBlogsModule',
        },
        loadChildren: () =>
          import('./pages/polls/poll.module').then((m) => m.PollModule),
      },
      {
        path: 'articles',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessBlogsModule',
        },
        loadChildren: () =>
          import('./pages/articles/article.module').then(
            (m) => m.ArticleModule
          ),
      },
      {
        path: 'blog-videos',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessBlogsModule',
        },
        loadChildren: () =>
          import('./pages/blog-videos/blog-videos.module').then(
            (m) => m.BlogVideosModule
          ),
      },
      {
        path: 'app/users',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessAppUsersModule',
        },
        loadChildren: () =>
          import('./pages/mobile-user/mobile-user.module').then(
            (m) => m.MobileUserModule
          ),
      },
      {
        path: 'meals',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessMealsModule',
        },
        loadChildren: () =>
          import('./pages/meals/meals.module').then((m) => m.MealsModule),
      },
      {
        path: 'plans',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessMealPlansModule',
        },
        loadChildren: () =>
          import('./pages/meal-plan/meal-plan.module').then(
            (m) => m.MealPlanModule
          ),
      },
      {
        path: 'admin-users',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessAdminUsersModule',
        },
        loadChildren: () =>
          import('./pages/admin-users/admin-users.module').then(
            (m) => m.AdminUsersModule
          ),
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'roles',
        canActivate: [PermissionGuard],
        data: {
          permission: 'canAccessAdminUsersModule',
        },
        loadChildren: () =>
          import('./pages/roles/roles.module').then((m) => m.RolesModule),
      },
      { path: 'no-access', component: NoAccessComponent },
      { path: '**', redirectTo: 'articles', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
