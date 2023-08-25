import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BaseV1ObjectResponseModel,
  BaseV1ResponseModel,
  HttpUtilsService,
  PagedListQueryModel,
} from '../shared';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const roleUrl = environment.baseAdminV1Url + 'role';

@Injectable()
export class RoleService {
  constructor(private httpClient: HttpClient) {}

  getPagedList(
    queryParams: PagedListQueryModel
  ): Observable<BaseV1ResponseModel<any[]>> {
    return this.httpClient.get<BaseV1ResponseModel<any[]>>(
      roleUrl + '/getPagedList',
      {
        params: HttpUtilsService.prepareGetPagedListQueryParams(queryParams),
      }
    );
  }

  getById(id: string): Observable<
    BaseV1ObjectResponseModel<{
      roleName: string;
      permissions: string[];
    }>
  > {
    return this.httpClient.get<
      BaseV1ObjectResponseModel<{
        roleName: string;
        permissions: string[];
      }>
    >(roleUrl + '/GetById', {
      params: { id },
    });
  }
}
