import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PagedListQueryModel } from '../../../core/shared';
import { Select, Store } from '@ngxs/store';
import { PollsActions } from '../../../core/store/polls/polls.actions';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { PollListItemModel } from '../../../core/polls/models/poll-list-item.model';
import { PollService } from '../../../core/polls/poll.service';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss'],
})
export class PollsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  search$ = new Subject<string>();
  searchWord: string;

  // State
  @Select((state) => state.polls?.polls) polls$: Observable<
    PollListItemModel[]
  >;
  @Select((state) => state.polls?.totalRows) totalRows$: Observable<number>;

  constructor(
    private store: Store,
    public router: Router,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  ngAfterViewInit(): void {
    this.search$
      .pipe(untilDestroyed(this), distinctUntilChanged(), debounceTime(150))
      .subscribe((searchTerm) => {
        this.searchWord = searchTerm;
        this.paginator.pageIndex = 0;

        this.loadPolls();
      });
  }

  loadPolls() {
    this.store.dispatch(
      new PollsActions.PollsPageRequested(this.prepareQueryParams())
    );
  }

  prepareQueryParams() {
    return new PagedListQueryModel({
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchWord: this.searchWord,
    });
  }

  deletePoll($event: MouseEvent, poll: PollListItemModel) {
    $event.stopPropagation();

    this.pollService
      .deletePoll(poll.id)
      .pipe(
        tap(() => {
          this.loadPolls();
        })
      )
      .subscribe();
  }
}
