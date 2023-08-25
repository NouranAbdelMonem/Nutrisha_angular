export class PagedListQueryModel {
  pageNumber: number = 0;
  pageSize: number = 10;
  searchWord: string = null;
  entityId: string;

  customFilters: Map<string, any> = new Map<string, any>();
  constructor(model: Partial<PagedListQueryModel>) {
    Object.assign(this, model);
  }
}
