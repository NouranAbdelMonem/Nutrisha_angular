import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHeaderResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestLoaderService, TranslationService } from '../shared';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private matDialog: MatSnackBar,
    private ngZone: NgZone,
    private router: Router,
    private translateService: TranslateService,
    private translationService: TranslationService,
    private requestLoaderService: RequestLoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = this.getBaseHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    let newReq = req.clone({
      headers: headers,
    });

    if (!this.ignoreRequestLoader(req)) {
      this.requestLoaderService.requestLoading$.next(true);
    }

    return next.handle(newReq).pipe(
      tap((res) => {
        if (!InterceptorService.isRequestCompetedSuccessfully(res)) {
          return;
        }

        this.requestLoaderService.requestLoading$.next(false);
        if (newReq.method != 'GET') {
          this.ngZone.run(() => {
            this.matDialog.open(
              this.translateService.instant('REQUESTS.SUCCESS'),
              this.translateService.instant('REQUESTS.DISMISS'),
              {
                duration: 5000,
                panelClass: 'successMessage',
                direction: this.translationService.dir,
              }
            );
          });
        }
      }),
      catchError((e: HttpErrorResponse) => {
        this.requestLoaderService.requestLoading$.next(false);
        let message = '';

        if (e.status == 401) {
          this.authService.logOut();
          this.router.navigateByUrl('auth/login');
          return throwError(() => e);
        }

        if (e.status == 400) {
          message = this.prepareErrorMessage(e);
        }

        if (message) {
          this.ngZone.run(() => {
            this.matDialog.open(
              message,
              this.translateService.instant('REQUESTS.DISMISS'),
              {
                duration: 5000,
                panelClass: 'errorMessage',
                direction: this.translationService.dir,
              }
            );
          });
        }

        return throwError(() => e);
      })
    );
  }

  private ignoreRequestLoaderDic = new Set<string>(['']);

  private ignoreRequestLoader(httpRequest: HttpRequest<any>): boolean {
    return (
      this.ignoreRequestLoaderDic.has(httpRequest.url) ||
      new RegExp('/assets/i18n/.*.json').test(httpRequest.url) ||
      httpRequest.url.includes('BlogTag/getAll')
    );
  }

  private prepareErrorMessage(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error?.title) {
        return error.error.title;
      }

      if (error.error?.errorMessage) {
        return error.error.errorMessage;
      }
    }

    return this.translateService.instant('REQUESTS.UNKNOWN_ERROR');
  }

  private static isRequestCompetedSuccessfully(
    res:
      | HttpSentEvent
      | HttpHeaderResponse
      | HttpResponse<any>
      | HttpProgressEvent
      | HttpUserEvent<any>
  ) {
    return (
      res.type != HttpEventType.UploadProgress && res.type != HttpEventType.Sent
    );
  }

  private timeZoneOffset = (
    (new Date().getTimezoneOffset() * -1) /
    60
  ).toString();

  private getBaseHeaders(): HttpHeaders {
    return new HttpHeaders().append('Time-Zone-Offset', this.timeZoneOffset);
  }
}
