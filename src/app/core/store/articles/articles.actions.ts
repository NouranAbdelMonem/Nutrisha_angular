import {PagedListQueryModel} from "../../shared/models/paged-list-query.model";



export namespace ArticlesActions {
  export class LoadArticles {
    public static type = "[Articles] Load Articles";

    constructor(public queryParams: PagedListQueryModel) {
    }
  }

  export class LoadArticleDetails {
    public static type = "[Articles] Load Article Details";
    constructor(public id: string) {
    }
  }

}
