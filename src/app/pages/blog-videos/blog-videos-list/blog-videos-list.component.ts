import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { BlogVideoListModel } from '../../../core/blog-videos';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PagedListQueryModel } from '../../../core/shared/models/paged-list-query.model';
import { BlogVideosActions } from '../../../core/store/blog-videos/blog-videos.actions';

@UntilDestroy()
@Component({
  selector: 'app-blog-videos-list',
  templateUrl: './blog-videos-list.component.html',
  styleUrls: ['./blog-videos-list.component.scss'],
})
export class BlogVideosListComponent implements OnInit {
  displayedColumns = ['title', 'tag', 'createdAt'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  search$ = new Subject<string>();
  searchWord: string;

  // Store
  @Select((state) => state.blogVideos.blogVideosPage) blogVideos$: Observable<
    BlogVideoListModel[]
  >;
  @Select((state) => state.blogVideos?.totalRows) totalRows$;

  constructor(public router: Router, private store: Store) {}

  ngOnInit(): void {
    this.loadBlogVideos();
  }

  ngAfterViewInit(): void {
    this.search$
      .pipe(untilDestroyed(this), distinctUntilChanged(), debounceTime(150))
      .subscribe((searchTerm) => {
        this.searchWord = searchTerm;
        this.paginator.pageIndex = 0;

        this.loadBlogVideos();
      });
  }

  loadBlogVideos() {
    this.store.dispatch(
      new BlogVideosActions.LoadBlogVideosPage(this.prepareQueryParams())
    );
  }

  prepareQueryParams() {
    return new PagedListQueryModel({
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchWord: this.searchWord,
    });
  }
}
