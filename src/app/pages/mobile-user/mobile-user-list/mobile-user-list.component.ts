import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MobileUserActions } from '../../../core/store/mobile-users/mobile-user.actions';
import { PagedListQueryModel } from '../../../core/shared/models/paged-list-query.model';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  from,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { MobileUserListModel } from '../../../core/mobile-users';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxPermissionsService } from 'ngx-permissions';

@UntilDestroy()
@Component({
  selector: 'app-mobile-user-list',
  templateUrl: './mobile-user-list.component.html',
  styleUrls: ['./mobile-user-list.component.scss'],
})
export class MobileUserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'profileImage',
    'name',
    'email',
    'phoneNumber',
    'createdDate',
    'subscribeDate',
    'totalPaidAmount',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  queryParams = new PagedListQueryModel({});
  search$ = new Subject<string>();
  searchWord: string;

  selectedFilter: string | null;

  // State
  @Select((state) => state.mobileUsers?.mobileUsersPage)
  dataSource$: Observable<MobileUserListModel[]>;
  @Select((state) => state.mobileUsers?.totalRows) totalRows$;

  constructor(
    private store: Store,
    private router: Router,
    private permissionService: NgxPermissionsService
  ) {}

  ngAfterViewInit(): void {
    this.search$
      .pipe(untilDestroyed(this), distinctUntilChanged(), debounceTime(150))
      .subscribe((searchTerm) => {
        this.searchWord = searchTerm;
        this.paginator.pageIndex = 0;

        this.loadUsers();
      });
  }

  ngOnInit(): void {
    from(this.permissionService.hasPermission('canViewAppUserContactInfo'))
      .pipe(
        untilDestroyed(this),
        tap((hasPermission) => {
          if (!hasPermission) {
            this.displayedColumns = [
              'profileImage',
              'name',
              'createdDate',
              'subscribeDate',
              'totalPaidAmount',
            ];
          }
        })
      )
      .subscribe();

    this.loadUsers();
  }

  loadUsers() {
    this.prepareQueryParams();
    this.store.dispatch(
      new MobileUserActions.LoadMobileUsers(this.queryParams)
    );
  }

  prepareQueryParams() {
    this.queryParams.pageNumber = this.paginator.pageIndex;
    this.queryParams.pageSize = this.paginator.pageSize;
    this.queryParams.searchWord = this.searchWord;

    this.queryParams.customFilters = this.selectedFilter
      ? (this.queryParams.customFilters = new Map<string, any>([
          [this.selectedFilter, true],
        ]))
      : null;
  }

  goToUserDetails(id) {
    this.router.navigateByUrl(`/app/users/${id}`);
  }
}
