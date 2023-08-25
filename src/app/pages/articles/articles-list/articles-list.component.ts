import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { ArticleListModel } from '../../../core/articles/models/article-list.model';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PagedListQueryModel } from '../../../core/shared';
import { ArticlesActions } from '../../../core/store/articles/articles.actions';

@UntilDestroy()
@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  displayedColumns = ['title', 'tag', 'createdAt'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  search$ = new Subject<string>();
  searchWord: string;

  // Store
  @Select((state) => state.articles.articlesPage) articles$: Observable<
    ArticleListModel[]
  >;
  @Select((state) => state.articles?.totalRows) totalRows$;

  constructor(public router: Router, private store: Store) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  ngAfterViewInit(): void {
    this.search$
      .pipe(untilDestroyed(this), distinctUntilChanged(), debounceTime(150))
      .subscribe((searchTerm) => {
        this.searchWord = searchTerm;
        this.paginator.pageIndex = 0;

        this.loadArticles();
      });
  }

  loadArticles() {
    this.store.dispatch(
      new ArticlesActions.LoadArticles(this.prepareQueryParams())
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
