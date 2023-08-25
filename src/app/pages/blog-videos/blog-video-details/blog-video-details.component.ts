import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BLogVideoDetailsViewModel,
  BlogVideoParser,
  BlogVideoService,
} from '../../../core/blog-videos';
import { BlogVideosActions } from '../../../core/store/blog-videos/blog-videos.actions';
import { Media } from '../../../core/shared';

@UntilDestroy()
@Component({
  selector: 'app-blog-video-details',
  templateUrl: './blog-video-details.component.html',
  styleUrls: ['./blog-video-details.component.scss'],
})
export class BlogVideoDetailsComponent implements OnInit {
  blogVideoForm: FormGroup;
  blogVideo: BLogVideoDetailsViewModel;

  viewOnly = false;
  // Store
  @Select((state) => state.blogVideos.lastLoadedBlogVideo)
  blogVideo$: Observable<BLogVideoDetailsViewModel>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store,
    private blogVideoService: BlogVideoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeBlogVideo();

    this.blogVideo$.pipe(untilDestroyed(this)).subscribe((details) => {
      if (!details) return;
      this.viewOnly = false;
      this.blogVideo = {
        ...details,
        coverImage: details.coverImage.map((m) => new Media(m)),
        mainVideo: details.mainVideo.map((m) => new Media(m)),
      };
      this.initializeFrom();

      this.blogVideoForm.markAsPristine();
      this.blogVideoForm.markAsUntouched();
    });
  }

  initializeBlogVideo() {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const id = params['id'];
        this.loadBlogVideo(id);
      });
  }

  initializeFrom() {
    if (this.blogVideoForm) {
      this.blogVideoForm.controls['subject'].setValue(this.blogVideo?.subject);
      this.blogVideoForm.controls['mainVideo'].setValue(
        this.blogVideo?.mainVideo
      );
      this.blogVideoForm.controls['coverImage'].setValue(
        this.blogVideo?.coverImage
      );
      this.blogVideoForm.controls['tag'].setValue(this.blogVideo?.tag);
      return;
    }

    this.blogVideoForm = this.formBuilder.group({
      subject: this.formBuilder.control(this.blogVideo?.subject, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      mainVideo: this.formBuilder.control(this.blogVideo.mainVideo, [
        Validators.required,
      ]),
      coverImage: this.formBuilder.control(this.blogVideo.coverImage),
      tag: this.formBuilder.control(this.blogVideo.tag, Validators.required),
    });
  }

  submit() {
    const model = BlogVideoParser.toModel(this.blogVideoForm.value);

    const data = {
      subject: model.subject,
      media: model.media,
      tagId: model.tag.id,
      id: this.blogVideo.id,
    };

    if (this.blogVideo.id) {
      this.blogVideoService
        .edit(data)
        .pipe()
        .subscribe((res) => this.loadBlogVideo(this.blogVideo.id));
      return;
    }
    this.blogVideoService
      .post(data)
      .pipe()
      .subscribe(async (res) => {
        await this.router.navigateByUrl('blog-videos/edit/' + res.data);
      });
  }

  cancelEditing() {
    this.loadBlogVideo(this.blogVideo.id);
    if (this.blogVideo.id) {
      this.viewOnly = false;
    }
  }

  delete() {
    this.blogVideoService
      .delete(this.blogVideo.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.router.navigateByUrl('blog-videos'));
  }

  private loadBlogVideo(id: string) {
    if (!id) {
      this.blogVideo = new BLogVideoDetailsViewModel();
      this.initializeFrom();
      this.blogVideoForm.markAsPristine();
      this.blogVideoForm.markAsUntouched();
      return;
    }

    this.store.dispatch(new BlogVideosActions.LoadBlogVideosDetails(id));
  }
}
