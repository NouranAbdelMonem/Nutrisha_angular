import { Observable } from 'rxjs';
import { BaseV1ResponseModel } from '../../shared/models/base-v1-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../shared/services/http-utils.service';
import { PagedListQueryModel } from '../../shared/models/paged-list-query.model';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';

const commentApiUrl = environment.baseAdminV1Url + 'Comment';

@Injectable()
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getPagedList(
    pagedListQueryModel: PagedListQueryModel
  ): Observable<BaseV1ResponseModel<CommentModel[]>> {
    return this.httpClient.get<BaseV1ResponseModel<CommentModel[]>>(
      commentApiUrl + '/GetPagedList',
      {
        params:
          HttpUtilsService.prepareGetPagedListQueryParams(pagedListQueryModel),
      }
    );
  }

  delete(id: string): Observable<BaseV1ResponseModel<any>> {
    return this.httpClient.delete<BaseV1ResponseModel<any>>(
      commentApiUrl + '/Delete',
      {
        params: {
          id: id,
        },
      }
    );
  }
}
