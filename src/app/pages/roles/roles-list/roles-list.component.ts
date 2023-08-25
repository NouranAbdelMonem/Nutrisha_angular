import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { PagedListQueryModel } from '../../../core/shared';
import { RoleService } from '../../../core/roles/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent implements OnInit {
  tableHeaderNames = ['name', 'permissions'];

  totalRows: number;
  roles: any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  search$ = new Subject<string>();
  searchWord: string;

  private _unsubscribe = new Subject<void>();
  constructor(private roleService: RoleService, public router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
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

        this.loadRoles();
      });
  }

  loadRoles() {
    this.roleService
      .getPagedList(this.prepareQueryParams())
      .pipe(
        takeUntil(this._unsubscribe),
        tap((res) => {
          this.totalRows = res.totalRows;
          this.roles = res.data;
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

}
