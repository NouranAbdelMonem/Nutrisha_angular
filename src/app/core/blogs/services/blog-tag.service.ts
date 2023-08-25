import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  BlogTagDetailsModel,
  PostBlogTagModel,
} from '../models/blog-tag.models';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseV1ResponseModel } from '../../shared/models/base-v1-response.model';

const url = environment.baseAdminV1Url + 'BlogTag/';

@Injectable()
export class BlogTagService {
  constructor(private httpClient: HttpClient) {}

  addTag(model: PostBlogTagModel): Observable<string> {
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNCIsIklzQWRtaW4iOiJUcnVlIiwibmJmIjoxNjU0MjE0NDk4LCJleHAiOjE2NTQzMDA4OTgsImlhdCI6MTY1NDIxNDQ5OH0.HRJBvflRmKiPW_D8KlLlM3WbvfXgmMg38zbocLIlTtC-XQ7LnU3xBWyAc3GcPPClH3vvEjOfRUIpY3Gk-k3KTA`
    );
    return this.httpClient
      .post<BaseV1ResponseModel<string>>(url + 'post', model, {
        headers,
      })
      .pipe(map((res) => res.data));
  }

  getAll(keyword: string): Observable<BlogTagDetailsModel[]> {
    let params: HttpParams;
    if (keyword) {
      params = new HttpParams().set('keyword', keyword);
    }
    return this.httpClient
      .get<BaseV1ResponseModel<BlogTagDetailsModel[]>>(url + 'getAll', {
        params: params,
      })
      .pipe(map((response) => response.data));
  }
}
