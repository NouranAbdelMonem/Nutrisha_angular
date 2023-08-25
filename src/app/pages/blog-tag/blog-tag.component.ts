import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Self,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ControlValueAccessor,
  NgControl,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormControl,
  Validators,
} from '@angular/forms';
import { map, of, switchMap, take, tap } from 'rxjs';
import { BlogTagCreateComponent } from './blog-tag-create/blog-tag-create.component';
import { BlogTagDetailsModel, BlogTagService } from '../../core/blogs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Tag } from '@angular/compiler/src/i18n/serializers/xml_helper';

@UntilDestroy()
@Component({
  selector: 'app-blog-tag',
  templateUrl: './blog-tag.component.html',
  styleUrls: ['./blog-tag.component.scss'],
})
export class BLogTagComponent
  implements OnInit, ControlValueAccessor, Validator
{
  loading: boolean = false;
  tags: BlogTagDetailsModel[];
  selectedTag: BlogTagDetailsModel;

  formControl = new FormControl();
  @Input() readOnly: boolean = true;
  @ViewChild('tag', { static: true }) input: ElementRef;

  constructor(
    @Self() public controlDir: NgControl,
    private blogTagService: BlogTagService,
    private dialog: MatDialog
  ) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    this.formControl.setValidators(this.controlDir.control.validator);
    this.formControl.setValidators(Validators.required);
  }

  addTag() {
    const dialogRef = this.dialog.open(BlogTagCreateComponent);
    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        take(1),
        switchMap((tag) => {
          if (tag) {
            return this.blogTagService.addTag(tag).pipe(
              map((tagId) => ({ ...tag, id: tagId })),
              tap((tag) => this.setSelectedTag(tag))
            );
          }

          return of(null);
        })
      )
      .subscribe();
  }

  setSelectedTag(tag) {
    this.controlDir.control?.setValue(tag);
  }

  clear() {
    this.selectedTag = null;
    this.formControl.markAsPristine();
    this.formControl.markAsUntouched();
    this.input.nativeElement.value = null;
  }

  loadOnFocusTags() {
    this.controlDir.control.markAsTouched();
    if (this.readOnly || this.selectedTag || (this.tags && this.tags.length)) {
      return;
    }

    this.loadTags(null);
  }
  loadTags(keyword) {
    this.loading = true;
    this.controlDir.control.markAsTouched();
    this.blogTagService
      .getAll(keyword)
      .pipe(untilDestroyed(this), take(1))
      .subscribe((tags) => {
        this.tags = tags;
        this.loading = false;
      });

    this.setSelectedTag(null);
  }

  // Validation
  validate(control: AbstractControl): ValidationErrors {
    if (this.selectedTag) return null;
    return [];
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  // NG CONTROL
  writeValue(obj: any): void {
    this.selectedTag = obj;
    if (obj) {
      this.formControl.setValue(obj.name);
      this.input.nativeElement.value = obj.name;
    } else {
      this.formControl?.setErrors([]);
    }
  }

  onChanged(event) {}

  onTouched() {}

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
