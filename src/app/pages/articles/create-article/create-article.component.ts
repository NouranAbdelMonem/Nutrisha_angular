import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/articles';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { ArticlesActions } from '../../../core/store/articles/articles.actions';
import { Observable } from 'rxjs';
import { ArticleDetailsViewModel } from '../../../core/articles/view-models/article-details.view.model';
import { Media } from '../../../core/shared';

@UntilDestroy()
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  selectedLang: 'en' | 'ar' = 'en';

  articleForm: FormGroup;
  article: ArticleDetailsViewModel;

  viewOnly = false;
  // Store
  @Select((state) => state.articles.lastLoadedArticle)
  articleDetails$: Observable<ArticleDetailsViewModel>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeArticle();

    this.articleDetails$.pipe(untilDestroyed(this)).subscribe((details) => {
      if (!details) return;
      this.viewOnly = false;
      this.article = {
        ...details,
        description: { ...details.description },
        coverImage: details.coverImage.map((m) => new Media(m)),
        additionalMedia: details.additionalMedia.map((m) => new Media(m)),
      };

      this.initializeFrom();
      this.articleForm.markAsPristine();
      this.articleForm.markAsUntouched();
    });
  }

  initializeArticle() {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const id = params['id'];
        this.loadArticle(id);
      });
  }

  initializeFrom() {
    if (this.articleForm) {
      this.articleForm.controls['description'].setValue(
        this.article?.description
      );
      this.articleForm.controls['subject'].setValue(this.article?.subject);
      this.articleForm.controls['coverImage'].setValue(this.article.coverImage);
      this.articleForm.controls['additionalMedia'].setValue(
        this.article.additionalMedia
      );
      this.articleForm.controls['tag'].setValue(this.article.tag);
      return;
    }

    this.articleForm = this.formBuilder.group({
      subject: this.formBuilder.control(this.article?.subject, [
        Validators.required,
        Validators.maxLength(120),
      ]),
      description: this.formBuilder.control(
        this.article?.description,
        Validators.required
      ),
      coverImage: this.formBuilder.control(this.article.coverImage),
      tag: this.formBuilder.control(this.article.tag, Validators.required),
      additionalMedia: this.formBuilder.control(this.article.additionalMedia),
    });
  }

  submit() {
    let media = this.articleForm.controls['coverImage'].value as Media[];
    if (this.articleForm.value.additionalMedia) {
      media = media.concat(this.articleForm.value.additionalMedia);
    }
    const data = {
      subject: this.articleForm.value.subject,
      description: this.articleForm.value.description,
      media: media,
      tagId: this.articleForm.value.tag.id,
      id: this.article.id,
    };

    if (this.article.id) {
      this.articleService
        .edit(data)
        .pipe()
        .subscribe((res) => this.loadArticle(this.article.id));
      return;
    }
    this.articleService
      .post(data)
      .pipe()
      .subscribe(async (res) => {
        await this.router.navigateByUrl('articles/edit/' + res.data);
      });
  }

  cancelEditing() {
    // if (this.article.id) {
    //   this.viewOnly = false;
    // }
    this.loadArticle(this.article.id);
  }

  private loadArticle(id: string) {
    if (!id) {
      this.article = new ArticleDetailsViewModel();
      this.initializeFrom();
      this.articleForm.markAsPristine();
      this.articleForm.markAsUntouched();
      return;
    }

    this.store.dispatch(new ArticlesActions.LoadArticleDetails(id));
  }

  delete() {
    this.articleService
      .delete(this.article.id)
      .pipe()
      .subscribe(() => this.router.navigateByUrl('articles'));
  }
}
