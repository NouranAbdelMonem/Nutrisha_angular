import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CreatePollModel} from "./models/create-poll.model";
import {Observable, tap} from "rxjs";
import {BaseV1ResponseModel} from "../shared/models/base-v1-response.model";
import {environment} from "../../../environments/environment";
import {PagedListQueryModel} from "../shared/models/paged-list-query.model";
import {PollListItemModel} from "./models/poll-list-item.model";
import {HttpUtilsService} from "../shared/services/http-utils.service";


const pollAPI = environment.baseAdminV1Url + 'Poll'

@Injectable()
export class PollService {
  constructor(private httpClient: HttpClient) {
  }


  getPagedList(params: PagedListQueryModel): Observable<BaseV1ResponseModel<PollListItemModel[]>> {
    return this.httpClient.get<BaseV1ResponseModel<PollListItemModel[]>>(
      pollAPI + '/GetPagedList',
      {
        params: HttpUtilsService.prepareGetPagedListQueryParams(params)
      }
    ).pipe(tap(result => {
      result.data.forEach(poll => {
        poll.answersCount = poll.answers
          .reduce((a, b) => a + b.selectedCount, 0);

      })

    }));
  }


  addPoll(pollModel: CreatePollModel): Observable<BaseV1ResponseModel<string>> {
    return this.httpClient.post<BaseV1ResponseModel<string>>(
      pollAPI + '/Post',
      pollModel
    );
  }

  deletePoll(id: string): Observable<BaseV1ResponseModel<any>> {
    return this.httpClient.delete<BaseV1ResponseModel<string>>(
      pollAPI + '/Delete',
      {
        params: new HttpParams().set('id', id)
      }
    );
  }
}
