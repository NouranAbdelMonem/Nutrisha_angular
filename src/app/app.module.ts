import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/auth/services/auth.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { AuthModule } from './pages/auth/auth.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BaseComponent } from './pages/base/base.component';
import { NavHeaderTitleService, SplashScreenService } from './core/shared';
import { HeaderTitleComponent } from './pages/shared/header-title/header-title.component';
import { environment } from '../environments/environment';
import { InterceptorService } from './core/interceptors/interceptor.service';

import { MaterialModule } from './pages/shared/material';
import { LoaderComponent } from './core/loader/loader.component';
import { SharedModule } from './pages/shared/shared.module';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UserModule } from './core/admin-user/user.module';
import { PermissionGuard } from './core/shared/guards/permission-guard.service';
import { UserActions } from './core/store/auth';
import { Observable, of } from 'rxjs';
import { NoAccessComponent } from './core/shared/no-access/no-access.component';
import { ConfirmDialogComponent } from './core/shared/confirm-dialog/confirm-dialog.component';

declare const languageFileVersion: string;
function initializeAppFactory(store: Store): () => Observable<any> {
  return () => {
    store.dispatch(new UserActions.LoadCurrentUser());
    return of(null);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HeaderTitleComponent,
    LoaderComponent,
    NoAccessComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: function HttpLoaderFactory(httpClient: HttpClient) {
          return new TranslateHttpLoader(
            httpClient,
            '/assets/i18n/',
            `.json?Version=` + languageFileVersion
          );
        },
        deps: [HttpClient],
      },
    }),
    MaterialModule,
    SharedModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    UserModule,
  ],
  providers: [
    AuthService,
    PermissionGuard,
    SplashScreenService,
    NavHeaderTitleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [Store],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
