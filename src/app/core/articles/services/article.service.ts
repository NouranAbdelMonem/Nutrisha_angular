import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ArticleDetailsModel } from '../models/article-details.models';
import { PostArticleModel } from '../models/post-article.model';
import {
  BaseV1ObjectResponseModel,
  BaseV1ResponseModel,
  HttpUtilsService,
  PagedListQueryModel,
} from '../../shared';
import { environment } from '../../../../environments/environment';
import { ArticleListModel } from '../models/article-list.model';

const articleAPI = environment.baseAdminV1Url + 'Article';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  getPagedList(
    queryParams: PagedListQueryModel
  ): Observable<BaseV1ResponseModel<ArticleListModel[]>> {
    return this.httpClient.get<BaseV1ResponseModel<ArticleListModel[]>>(
      articleAPI + '/getPagedList',
      {
        params: HttpUtilsService.prepareGetPagedListQueryParams(queryParams),
      }
    );
  }

  getById(id: string): Observable<BaseV1ResponseModel<ArticleDetailsModel>> {
    return this.httpClient.get<BaseV1ResponseModel<ArticleDetailsModel>>(
      `${articleAPI}/GetById?id=${id}`
    );
  }

  delete(id: string): Observable<BaseV1ObjectResponseModel<any>> {
    return this.httpClient.put<BaseV1ObjectResponseModel<any>>(
      `${articleAPI}/Delete?id=${id}`,
      {}
    );
  }

  post(body: PostArticleModel): Observable<BaseV1ResponseModel<string>> {
    const formData = new FormData();
    formData.append('subject', body.subject);
    formData.append('tagId', body.tagId);
    HttpUtilsService.appendMediaToForm(formData, body.media);
    HttpUtilsService.appendLocalizedObjectToForm(
      formData,
      'description',
      body.description
    );

    return this.httpClient
      .post<BaseV1ResponseModel<string>>(articleAPI + '/post', formData, {
        observe: 'events',
        reportProgress: true,
      })
      .pipe(
        HttpUtilsService.handleUploadProgress(),
        map((result) => result.body)
      );
  }

  edit(body: PostArticleModel): Observable<BaseV1ResponseModel<string>> {
    const formData = new FormData();
    formData.append('subject', body.subject);
    formData.append('id', body.id);
    formData.append('tagId', body.tagId);
    HttpUtilsService.appendMediaToForm(formData, body.media);
    HttpUtilsService.appendLocalizedObjectToForm(
      formData,
      'description',
      body.description
    );

    return this.httpClient
      .put<BaseV1ResponseModel<string>>(articleAPI + '/put', formData, {
        observe: 'events',
        reportProgress: true,
      })
      .pipe(
        HttpUtilsService.handleUploadProgress(),
        map((result) => result.body)
      );
  }
}
