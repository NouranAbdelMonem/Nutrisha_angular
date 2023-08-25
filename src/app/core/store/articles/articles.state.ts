import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ArticlesActions } from './articles.actions';
import { ArticleDetailsModel, ArticleService } from '../../articles';
import { ArticleListModel } from '../../articles/models/article-list.model';
import { tap } from 'rxjs';
import { ArticleDetailsViewModel } from '../../articles/view-models/article-details.view.model';
import { ArticleParser } from '../../articles/parser/article.parser';

interface ArticleStateModel {
  totalRows: number;
  articlesPage: ArticleListModel[];
  lastLoadedArticle: ArticleDetailsViewModel;
}

@Injectable()
@State<ArticleStateModel>({
  name: 'articles',
})
export class ArticleState {
  constructor(private articleService: ArticleService) {}

  @Action(ArticlesActions.LoadArticles)
  getPagedList(
    ctx: StateContext<ArticleStateModel>,
    action: ArticlesActions.LoadArticles
  ) {
    return this.articleService.getPagedList(action.queryParams).pipe(
      tap((result) => {
        const data = result.data;
        ctx.setState({
          ...ctx.getState(),
          articlesPage: data,
          totalRows: result.totalRows,
          lastLoadedArticle: undefined,
        });
      })
    );
  }

  @Action(ArticlesActions.LoadArticleDetails)
  getById(
    ctx: StateContext<ArticleStateModel>,
    action: ArticlesActions.LoadArticleDetails
  ) {
    return this.articleService.getById(action.id).pipe(
      tap((result) => {
        const data = result.data;
        ctx.setState({
          ...ctx.getState(),
          lastLoadedArticle: ArticleParser.toViewModel(data),
        });
      })
    );
  }
}
