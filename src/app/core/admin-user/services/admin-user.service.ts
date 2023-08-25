import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  HttpUtilsService,
  PagedListQueryModel,
  BaseV1ResponseModel,
  Media,
} from '../../shared';

const adminUserApi = environment.baseAdminV1Url + 'AdminUser';

@Injectable()
export class AdminUserService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  loadCurrentUser(): Observable<BaseV1ResponseModel<any>> {
    const token = this.authService.getToken();

    if (!token) {
      return of(null);
    }

    return this.httpClient.get<BaseV1ResponseModel<any>>(
      adminUserApi + '/GetUser'
    );
  }

  getPagedList(
    queryParams: PagedListQueryModel
  ): Observable<BaseV1ResponseModel<any[]>> {
    return this.httpClient.get<BaseV1ResponseModel<any[]>>(
      adminUserApi + '/getPagedList',
      {
        params: HttpUtilsService.prepareGetPagedListQueryParams(queryParams),
      }
    );
  }

  getById(id): Observable<BaseV1ResponseModel<any>> {
    return this.httpClient.get<BaseV1ResponseModel<any[]>>(
      adminUserApi + '/getById',
      {
        params: { id },
      }
    );
  }

  put(userId, roleId) {
    return this.httpClient.put(adminUserApi + '/put', {
      userId,
      roleId,
    });
  }

  post(user: any): Observable<BaseV1ResponseModel<number>> {
    return this.httpClient.post<BaseV1ResponseModel<number>>(
      adminUserApi + '/post',
      user
    );
  }

  delete(id) {
    return this.httpClient.delete(adminUserApi + '/delete', {
      params: { id },
    });
  }

  updateProfile(data: {
    name: string;
    email: string;
    image: Media;
  }): Observable<BaseV1ResponseModel<any>> {
    if (!data) return of(null);
    const form = new FormData();
    form.append('name', data.name);
    form.append('email', data.email);

    if (data.image?.file) {
      form.append('Image', data.image.file as Blob, data.image.file.name);
    }

    return this.httpClient.put<BaseV1ResponseModel<any>>(
      adminUserApi + '/UpdateProfile',
      form
    );
  }
}
