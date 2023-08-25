import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material';
import { ArticlesComponent } from './base/articles.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { TranslateModule } from '@ngx-translate/core';
import { RichTextModule } from '../shared/rich-text/rich-text.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleService } from '../../core/articles';
import { BlogTagModule } from '../blog-tag/blog-tag.module';
import { NgxsModule } from '@ngxs/store';
import { ArticleState } from '../../core/store/articles/articles.state';
import { CommentsModule } from '../comments/comments.module';
import { MediaPlayerModule } from '../shared/media-players/media-player.module';
import {NgxPermissionsModule} from "ngx-permissions";

@NgModule({
  declarations: [
    ArticlesComponent,
    CreateArticleComponent,
    ArticlesListComponent,
  ],
    imports: [
        CommonModule,
        MaterialModule,
        ArticlesRoutingModule,
        TranslateModule.forChild(),
        RichTextModule,
        ReactiveFormsModule,
        SharedModule,
        BlogTagModule,
        NgxsModule.forFeature([ArticleState]),
        CommentsModule,
        FormsModule,
        MediaPlayerModule,
        NgxPermissionsModule.forChild(),
    ],
  providers: [ArticleService],
})
export class ArticleModule {}
