import {PagedListQueryModel} from "../../shared/models/paged-list-query.model";

export namespace MobileUserActions {
  export class LoadMobileUsers {
    static readonly type = '[Mobile Users] Load Mobile User Page'

    constructor(public pagedModelQueryModel: PagedListQueryModel) {
    }
  }

  export class LoadUserDetails {
    static readonly type = '[Mobile Users] Load Mobile User Details'

    constructor(public userId: string) {
    }
  }
}
