import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  BaseV1ObjectResponseModel,
  BaseV1ResponseModel,
  HttpUtilsService,
  PagedListQueryModel,
} from '../../shared';
import { environment } from '../../../../environments/environment';
import { BlogVideoListModel } from '../models/blog-video-list.model';
import { BlogVideoDetailsModel } from '../models/blog-video-details.models';
import { PostBlogVideoModel } from '../models/post-blog-video.model';

const blogVideoApi = environment.baseAdminV1Url + 'BlogVideo';

@Injectable()
export class BlogVideoService {
  constructor(private httpClient: HttpClient) {}

  getPagedList(
    queryParams: PagedListQueryModel
  ): Observable<BaseV1ResponseModel<BlogVideoListModel[]>> {
    return this.httpClient.get<BaseV1ResponseModel<BlogVideoListModel[]>>(
      blogVideoApi + '/getPagedList',
      {
        params: HttpUtilsService.prepareGetPagedListQueryParams(queryParams),
      }
    );
  }

  getById(id: string): Observable<BaseV1ResponseModel<BlogVideoDetailsModel>> {
    return this.httpClient.get<BaseV1ResponseModel<BlogVideoDetailsModel>>(
      `${blogVideoApi}/GetById?id=${id}`
    );
  }

  delete(id: string): Observable<BaseV1ObjectResponseModel<any>> {
    return this.httpClient.delete<BaseV1ObjectResponseModel<any>>(
      `${blogVideoApi}/Delete?id=${id}`
    );
  }

  post(body: PostBlogVideoModel): Observable<BaseV1ResponseModel<string>> {
    const formData = new FormData();
    formData.append('subject', body.subject);
    formData.append('tagId', body.tagId);
    HttpUtilsService.appendMediaToForm(formData, body.media);

    return this.httpClient
      .post<BaseV1ResponseModel<string>>(blogVideoApi + '/post', formData, {
        observe: 'events',
        reportProgress: true,
      })
      .pipe(
        HttpUtilsService.handleUploadProgress(),
        map((result) => result.body)
      );
  }

  edit(body: PostBlogVideoModel): Observable<BaseV1ResponseModel<string>> {
    const formData = new FormData();
    formData.append('subject', body.subject);
    formData.append('id', body.id);
    formData.append('tagId', body.tagId);
    HttpUtilsService.appendMediaToForm(formData, body.media);

    return this.httpClient
      .put<BaseV1ResponseModel<string>>(blogVideoApi + '/put', formData, {
        observe: 'events',
        reportProgress: true,
      })
      .pipe(
        HttpUtilsService.handleUploadProgress(),
        map((result) => result.body)
      );
  }
}
