import { NgModule } from '@angular/core';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentService } from '../../core/comments';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [CommentsListComponent],
  exports: [CommentsListComponent],
  imports: [
    MatPaginatorModule,
    CommonModule,
    SharedModule,
    MatMenuModule,
    TranslateModule,
    MatButtonModule,
    NgxPermissionsModule.forChild()
  ],
  providers: [CommentService],
})
export class CommentsModule {}
