import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogVideosListComponent } from './blog-videos-list/blog-videos-list.component';
import { BlogVideoDetailsComponent } from './blog-video-details/blog-video-details.component';
import { BlogVideosRoutingModule } from './blog-videos.routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { BlogTagModule } from '../blog-tag/blog-tag.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BlogVideoService } from '../../core/blog-videos';
import { NgxsModule } from '@ngxs/store';
import { BlogVideosState } from '../../core/store/blog-videos/blog-videos';
import { MatMenuModule } from '@angular/material/menu';
import {NgxPermissionsModule} from "ngx-permissions";

@NgModule({
  declarations: [BlogVideosListComponent, BlogVideoDetailsComponent],
    imports: [
        CommonModule,
        BlogVideosRoutingModule,
        MatPaginatorModule,
        SharedModule,
        MatTableModule,
        TranslateModule,
        MatInputModule,
        BlogTagModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgxsModule.forFeature([BlogVideosState]),
        MatMenuModule,
        NgxPermissionsModule,
    ],
  providers: [BlogVideoService],
})
export class BlogVideosModule {}
