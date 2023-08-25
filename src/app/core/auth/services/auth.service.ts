import { Injectable } from '@angular/core';
import { LoginModel } from '../auth.models';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { BaseV1ResponseModel } from '../../shared';
import { UserLoginResponse } from '../responses/UserLoginResponse';
import { environment } from '../../../../environments/environment';

const baseUrl = environment.baseAdminV1Url + 'auth';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(
    loginModel: LoginModel
  ): Observable<BaseV1ResponseModel<UserLoginResponse>> {
    return this.httpClient
      .post<BaseV1ResponseModel<UserLoginResponse>>(
        baseUrl + '/login',
        loginModel
      )
      .pipe(
        tap((res) => {
          this.setToken(res.data.token)
          this.setIsOwned(res.data.user.isOwned)})
        ,
        shareReplay(1)
      );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.getItem('expiryDate');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  requestResetPassword(email: string): Observable<any> {
    return this.httpClient.post(baseUrl + '/requestResetPassword', {
      email,
    });
  }

  resetPassword(param: { password: any; token: any }) {
    return this.httpClient.post(baseUrl + '/resetPassword', param);
  }

  changePassword(param: { oldPassword: string; newPassword: string }) {
    return this.httpClient.post(baseUrl + '/changePassword', param);
  }
  isExpired() {
    const expiryDate = localStorage.getItem('expiryDate');

    if (!expiryDate) {
      return true;
    }

    return new Date() > new Date(expiryDate);
  }

  private setToken(token: string) {
    localStorage.setItem('expiryAt', new Date().toString());
    localStorage.setItem('token', token);
  }

  private setIsOwned(isOwned: boolean) {
    localStorage.setItem('isOwned', JSON.stringify(isOwned));
  }
  
}
