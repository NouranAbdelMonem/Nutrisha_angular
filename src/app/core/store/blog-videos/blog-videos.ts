import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { BlogVideoParser } from '../../blog-videos';
import {
  BLogVideoDetailsViewModel,
  BlogVideoListModel,
  BlogVideoService,
} from '../../blog-videos';
import { BlogVideosActions } from './blog-videos.actions';

interface BlogVideoStateModel {
  totalRows: number;
  blogVideosPage: BlogVideoListModel[];
  lastLoadedBlogVideo: BLogVideoDetailsViewModel;
}

@Injectable()
@State<BlogVideoStateModel>({
  name: 'blogVideos',
})
export class BlogVideosState {
  constructor(private blogVideoService: BlogVideoService) {}

  @Action(BlogVideosActions.LoadBlogVideosPage)
  getPagedList(
    ctx: StateContext<BlogVideoStateModel>,
    action: BlogVideosActions.LoadBlogVideosPage
  ) {
    return this.blogVideoService.getPagedList(action.queryParams).pipe(
      tap((result) => {
        const data = result.data;
        ctx.setState({
          ...ctx.getState(),
          blogVideosPage: data,
          totalRows: result.totalRows,
          lastLoadedBlogVideo: undefined,
        });
      })
    );
  }

  @Action(BlogVideosActions.LoadBlogVideosDetails)
  getById(
    ctx: StateContext<BlogVideoStateModel>,
    action: BlogVideosActions.LoadBlogVideosDetails
  ) {
    return this.blogVideoService.getById(action.id).pipe(
      tap((result) => {
        const data = result.data;
        ctx.setState({
          ...ctx.getState(),
          lastLoadedBlogVideo: BlogVideoParser.toViewModel(data),
        });
      })
    );
  }
}
