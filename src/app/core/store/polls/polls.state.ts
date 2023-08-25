import {Injectable} from "@angular/core";
import {Action, Select, State, StateContext} from "@ngxs/store";
import {PollsActions} from "./polls.actions";
import {PollService} from "../../polls/poll.service";
import {PollStoreModel} from "./polls.models";
import {switchMap} from "rxjs";


@State<PollStoreModel>({
    name: "polls",
    defaults: null
})
@Injectable()
export class PollsState {

    constructor(private pollService: PollService) {
    }

    @Action(PollsActions.PollsPageRequested)
    getPolls(ctx: StateContext<any>, action: PollsActions.PollsPageRequested) {
        return this.pollService.getPagedList(action.payload).pipe(
            switchMap(result => {
                return ctx.dispatch(new PollsActions.PollsPageReceived({
                    polls: result.data,
                    totalRows: result.totalRows,
                    query: action.payload,
                    ids: result.data.map(poll => poll.id)
                }))
            }));
    }

    @Action(PollsActions.PollsPageReceived)
    loadPolls(ctx: StateContext<PollStoreModel>, action: PollsActions.PollsPageReceived) {
        ctx.patchState(action.payload);
    }

    // Selectors
    @Select()
    static getPollsPage(state: any): any {
        return state?.polls.polls;
    }
}
