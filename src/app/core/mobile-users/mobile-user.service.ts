import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserPreventTypeEnum } from './models/user-prevention-type.enum';
import { Observable } from 'rxjs';
import {
  BaseV1ResponseModel,
  PagedListQueryModel,
  HttpUtilsService,
  BaseV1ObjectResponseModel,
} from '../shared';
import { MobileUserListModel } from './models/mobile-user-list-model';
import { MobileUserDetailsModel } from './models/mobile-user-details.model';

const mobileUserBaseUrl = environment.baseAdminV1Url + 'MobileUser/';

@Injectable()
export class MobileUserService {
  constructor(private httpClient: HttpClient) {}

  getPagedList(
    pagedModelQueryModel: PagedListQueryModel
  ): Observable<BaseV1ResponseModel<MobileUserListModel[]>> {
    return this.httpClient.get<BaseV1ResponseModel<MobileUserListModel[]>>(
      mobileUserBaseUrl + 'getPagedList',
      {
        params:
          HttpUtilsService.prepareGetPagedListQueryParams(pagedModelQueryModel),
      }
    );
  }

  getUserDetails(
    userId: string
  ): Observable<BaseV1ResponseModel<MobileUserDetailsModel>> {
    return this.httpClient.get<BaseV1ResponseModel<MobileUserDetailsModel>>(
      mobileUserBaseUrl + 'GetUserDetails',
      {
        params: { userId },
      }
    );
  }

  getUserPersonalDetails(userId: string): Observable<BaseV1ResponseModel<any>> {
    return this.httpClient.get<BaseV1ResponseModel<MobileUserDetailsModel>>(
      mobileUserBaseUrl + 'GetUserPersonalDetails',
      {
        params: { userId },
      }
    );
  }

  ban(userId: string): Observable<BaseV1ObjectResponseModel<any>> {
    return this.httpClient.put<BaseV1ObjectResponseModel<any>>(
      mobileUserBaseUrl + 'Ban',
      {},
      {
        params: { userId },
      }
    );
  }

  unBan(userId: string) {
    return this.httpClient.put<BaseV1ObjectResponseModel<any>>(
      mobileUserBaseUrl + 'UnBan',
      {},
      {
        params: { userId },
      }
    );
  }

  prevent(
    userId: number,
    userPreventionType: UserPreventTypeEnum
  ): Observable<BaseV1ResponseModel<any>> {
    return this.httpClient.post<BaseV1ResponseModel<any>>(
      mobileUserBaseUrl + 'prevent',
      {
        userId: userId,
        preventionType: userPreventionType,
      }
    );
  }

  makePremium(model: { userId: string; endDate: Date; amountPaid: number }) {
    return this.httpClient.post<BaseV1ObjectResponseModel<any>>(
      mobileUserBaseUrl + 'test',
      model
    );
  }
}
