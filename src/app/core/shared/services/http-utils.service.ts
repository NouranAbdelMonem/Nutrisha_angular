import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skipWhile, Subject, tap } from 'rxjs';
import {
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Media } from '../models/media';
import { PagedListQueryModel } from '../models/paged-list-query.model';
import { LocalizedObject } from '../models/localized-object.model';

export interface Upload {
  progress: number;
  inProgress: boolean;
}

@Injectable({ providedIn: 'root' })
export class HttpUtilsService {
  uploadProgress$: Observable<any>;
  #uploadProgress = new Subject<Upload>();

  constructor() {
    this.uploadProgress$ = this.#uploadProgress;
  }

  static appendLocalizedObjectToForm(
    formData: FormData,
    key: string,
    localized: LocalizedObject
  ) {
    if (localized.en) formData.append(`${key}.en`, localized.en);
    if (localized.ar) formData.append(`${key}.ar`, localized.ar);
  }

  static appendMediaToForm(formData: FormData, media: Media[]) {
    if (!formData) return;

    if (!media || media.length === 0) return;

    let filesIndex = 0;
    let externalIndex = 0;
    //To API Problem
    formData.append(`files[${filesIndex}].index`, '0');

    media.forEach((m) => {
      if (m.removed) {
        formData.append('DeletedMediaIds', m.id);
        return;
      }

      if (!m.isNew) {
        return;
      }
      if (!m.file && !m.url) {
        return;
      }

      if (m.file) {
        formData.append(`files[${filesIndex}].file`, m.file, m.file.name);
        this.appendMediaFlag(formData, m.flags, `files[${filesIndex}].flags`);
        filesIndex++;
        return;
      }

      formData.append(`externalMedia[${externalIndex}].url`, m.url);
      this.appendMediaFlag(
        formData,
        m.flags,
        `externalMedia[${externalIndex}].flags`
      );
      externalIndex++;
    });
  }

  handleUploadProgress(): (
    source: Observable<HttpEvent<unknown>>
  ) => Observable<any> {
    return (source) =>
      source.pipe(
        tap((event) => {
          // Via this API, you get access to the raw event stream.
          // Look for upload progress events.
          if (event.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.#uploadProgress.next({
              progress: percentDone,
              inProgress: true,
            });
          } else if (event instanceof HttpResponse) {
            this.#uploadProgress.next({ progress: 100, inProgress: false });
          }
        }),
        skipWhile((event) => !(event instanceof HttpResponse))
      );
  }

  private static appendMediaFlag(
    formData: FormData,
    flags: string[],
    key: string
  ) {
    if (flags) {
      flags.forEach((flag) => {
        formData.append(key, flag);
      });
    }
  }

  static prepareGetPagedListQueryParams(
    pagedModelQueryModel: PagedListQueryModel
  ): HttpParams {
    let params = new HttpParams()
      .set('pageNumber', pagedModelQueryModel.pageNumber + 1)
      .set('pageSize', pagedModelQueryModel.pageSize ?? 10);

    if (pagedModelQueryModel.searchWord) {
      params = params.set('searchWord', pagedModelQueryModel.searchWord);
    }

    if (pagedModelQueryModel.entityId) {
      params = params.set('entityId', pagedModelQueryModel.entityId);
    }

    if (
      pagedModelQueryModel.customFilters &&
      pagedModelQueryModel.customFilters.size
    ) {
      pagedModelQueryModel.customFilters.forEach((value, key) => {
        params = params.set(key, value);
      });
    }

    return params;
  }

  static uploadProgressSubject = new BehaviorSubject<Upload>({
    inProgress: false,
    progress: 0,
  });
  static uploadProgress$ =
    HttpUtilsService.uploadProgressSubject.asObservable();

  static handleUploadProgress(): (
    source: Observable<HttpEvent<unknown>>
  ) => Observable<any> {
    return (source) =>
      source.pipe(
        tap((event) => {
          // Via this API, you get access to the raw event stream.
          // Look for upload progress events.
          if (event.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.uploadProgressSubject.next({
              progress: percentDone,
              inProgress: true,
            });
          } else if (event instanceof HttpResponse) {
            this.uploadProgressSubject.next({
              progress: 100,
              inProgress: false,
            });
          }
        }),
        skipWhile((event) => !(event instanceof HttpResponse))
      );
  }
}
