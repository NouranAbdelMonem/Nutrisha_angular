import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PagedListQueryModel } from '../../../core/shared/models/paged-list-query.model';
import { CommentModel, CommentService } from '../../../core/comments';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  queryParams = new PagedListQueryModel({});
  totalRows: number;
  comments: CommentModel[];
  @Input() entityId: string;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.queryParams.entityId = this.entityId;
    this.loadComments();
  }

  public loadComments() {
    this.commentService
      .getPagedList(this.queryParams)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.comments = result.data;
        this.totalRows = result.totalRows;
      });
  }

  deleteComment(id: string) {
    this.commentService
      .delete(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadComments();
      });
  }
}
