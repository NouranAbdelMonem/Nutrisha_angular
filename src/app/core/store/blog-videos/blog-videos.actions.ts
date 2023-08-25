import { PagedListQueryModel } from '../../shared/models/paged-list-query.model';

export namespace BlogVideosActions {
  export class LoadBlogVideosPage {
    public static type = '[BlogVideos] Load BlogVideos Page';

    constructor(public queryParams: PagedListQueryModel) {}
  }

  export class LoadBlogVideosDetails {
    public static type = '[BlogVideos] Load BlogVideo Details';
    constructor(public id: string) {}
  }
}
