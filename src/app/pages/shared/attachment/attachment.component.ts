import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import {
  ExternalMediaValidator,
  HttpUtilsService,
  Media,
  MediaType,
  Upload,
} from '../../../core/shared';
import { MatDialog } from '@angular/material/dialog';
import { VideoPlayerComponent } from '../media-players/video-player/video-player.component';
import { ImagePreviewComponent } from '../media-players/image-preview/image-preview.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent implements OnInit, ControlValueAccessor {
  media: Media[] = [];
  uploadProgress$: Observable<Upload> = HttpUtilsService.uploadProgress$;

  mediaCount = 0;
  @Input() imagesType: 'image/*' | string = "'image/*'";
  @Input() videoType: 'video/*' | string = 'video/*';
  @Input() supportType: 'image' | 'video' | 'all';
  @Input() required: boolean;
  @Input() multi: boolean = false;
  @Input() maxLength: number = Number.MAX_SAFE_INTEGER;
  @Input() minLength: number = 0;
  @Input() readOnly: boolean = false;
  @Input() label: string;
  externalLinkControl = new FormControl(null, [Validators.required]);

  constructor(public ngControl: NgControl, private dialog: MatDialog) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private _flags: string[];

  @Input()
  get flags() {
    return this._flags;
  }

  set flags(value: string[] | string) {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      this._flags = value;
      return;
    }

    this._flags = [value];
  }

  ngOnInit(): void {
    this.ngControl.control.addValidators((control) => {
      const isLessThanMinLenght = this.mediaCount < this.minLength;
      const isBiggerThanMinLenght = this.mediaCount > this.maxLength;
      if (isBiggerThanMinLenght || isLessThanMinLenght) {
        setTimeout(() => {
          this.ngControl.control.setErrors({});
        }, 1);
        return;
      }

      return null;
    });
    this.ngControl.control.updateValueAndValidity();
  }

  prepareImage(files: FileList) {
    if (!this.multi && files.length > 1) return;

    for (let i = 0; i < files.length; i++) {
      const image = files.item(i);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      const media = new Media({
        file: image,
        mediaType: MediaType.Image,
        isNew: true,
        flags: this._flags,
      });
      fileReader.onload = (e) => {
        media.url = fileReader.result as string;
        this.media = [...this.media, media];
        this.mediaCount++;
        this.setValue();
      };
    }
  }

  prepareVideo(files: FileList) {
    if (!this.multi && files.length > 1) return;
    for (let i = 0; i < files.length; i++) {
      this.media.push(
        new Media({
          file: files.item(i),
          mediaType: MediaType.Video,
          isNew: true,
          flags: this._flags,
        })
      );

      this.mediaCount++;
      this.setValue();
    }
  }

  addExternalMedia(value: string) {
    const result = ExternalMediaValidator.getLinkVideoType(value);

    this.mediaCount++;
    this.media.push(
      new Media({
        url: value,
        mediaType: result,
        isNew: true,
        flags: this._flags,
      })
    );

    this.setValue();
    this.resetExternalForm();
  }

  resetExternalForm() {
    this.externalLinkControl.markAsUntouched();
    this.externalLinkControl.setValue(null);
    this.externalLinkControl.markAsPristine();
  }

  removeMedia(media: Media) {
    this.mediaCount--;
    if (media.isNew) {
      this.media = this.media.filter((m) => m != media);
    } else {
      media.removed = true;
    }
    
    this.setValue();
    
  }

  playVideo(media: Media) {
    if (media.file) {
      return;
    }
    this.dialog.open(VideoPlayerComponent, {
      data: media,
      width: 'calc(100vw - 0.001px)', // not 100vw, to prevent displaying thumbnail while dragging image
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'bg-trasparent',
    });
  }

  openImage(media: Media) {
    this.dialog.open(ImagePreviewComponent, {
      data: [media],
      width: 'calc(100vw - 0.001px)', // not 100vw, to prevent displaying thumbnail while dragging image
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'bg-trasparent',
    });
  }

  clear() {
    this.ngControl.control.markAsPristine();
    this.ngControl.control.markAsUntouched();
    this.media = [];
  }
  // Form
  setValue() {
    this.ngControl.control.setValue(this.media);
  }

  writeValue(obj: any): void {
    if (!obj) {
      this.media = [];
      this.mediaCount = 0;
      return;
    }

    if (Array.isArray(obj)) {
      this.media = obj;
      this.mediaCount = obj.filter((m) => !m.removed).length;
      return;
    }

    this.media = [obj];
    this.mediaCount = (obj as Media).removed ? 0 : 1;
    return;
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
