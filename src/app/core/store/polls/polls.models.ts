import {PollListItemModel} from "../../polls/models/poll-list-item.model";
import {PagedListQueryModel} from "../../shared/models/paged-list-query.model";

export interface PollStoreModel {
    totalRows: number,
    ids: string[],
    polls: PollListItemModel[],
    query: PagedListQueryModel
}