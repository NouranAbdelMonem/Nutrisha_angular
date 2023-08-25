import { Component, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  from,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { PagedListQueryModel } from '../../../core/shared';
import { MatPaginator } from '@angular/material/paginator';
import { AdminUserService } from '../../../core/admin-user/services/admin-user.service';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss'],
})
export class AdminUsersListComponent implements OnInit {
  tableHeaderNames = ['name', 'email', 'role', 'settings'];
  totalRows: number;
  users: any[];

  selectedRoleName: string | null = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  search$ = new Subject<string>();
  searchWord: string;

  private _unsubscribe = new Subject<void>();

  constructor(
    private adminUserService: AdminUserService,
    public router: Router,
    private permissionService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  ngAfterViewInit(): void {
    this.search$
      .pipe(
        takeUntil(this._unsubscribe),
        distinctUntilChanged(),
        debounceTime(150)
      )
      .subscribe((searchTerm) => {
        this.searchWord = searchTerm;
        this.paginator.pageIndex = 0;

        this.loadUsers();
      });
  }

  loadUsers() {
    const params = this.prepareQueryParams();

    if (this.selectedRoleName) {
      params.customFilters.set('roleName', this.selectedRoleName);
    }

    this.adminUserService
      .getPagedList(params)
      .pipe(
        takeUntil(this._unsubscribe),
        tap((res) => {
          this.totalRows = res.totalRows;
          this.users = res.data;
        })
      )
      .subscribe();
  }

  prepareQueryParams() {
    return new PagedListQueryModel({
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchWord: this.searchWord,
    });
  }

  goToUserDetails(id) {
    from(this.permissionService.hasPermission('canEditAdminUsers'))
      .pipe(
        takeUntil(this._unsubscribe),
        tap(async (canEditAdminUser) => {
          if (canEditAdminUser)
            await this.router.navigateByUrl('admin-users/edit/' + id);
        })
      )
      .subscribe();
  }
}
