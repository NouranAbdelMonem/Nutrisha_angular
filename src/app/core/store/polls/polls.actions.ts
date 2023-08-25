import {PagedListQueryModel} from "../../shared/models/paged-list-query.model";
import {PollStoreModel} from "./polls.models";
import {CreatePollModel} from "../../polls/models/create-poll.model";

export namespace PollsActions {
    // Create 
    export class CreatePoll {
        static readonly type = '[Polls] Polls Page Requested';
        constructor(public payload: CreatePollModel) {
        }
    }

    // export class PollCreated {
    //     static readonly type = '[Polls] Polls Page Requested';
    //     constructor(public payload: CreatePollModel) {
    //     }
    // }

    

    // Get
    export class PollsPageRequested {
        static readonly type = '[Polls] Polls Page Requested';
        constructor(public payload: PagedListQueryModel) {
        }
    }

    export class PollsPageReceived {
        static readonly type = '[Polls] Polls Page Received';
        constructor(public payload: Partial<PollStoreModel>) {
        }
    }
}