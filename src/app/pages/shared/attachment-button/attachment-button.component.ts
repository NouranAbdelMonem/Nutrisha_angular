import { Component, Input, OnInit } from '@angular/core';
import { Media, MediaType } from '../../../core/shared';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { ImagePreviewComponent } from '../media-players/image-preview/image-preview.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attachment-button',
  templateUrl: './attachment-button.component.html',
  styleUrls: ['./attachment-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AttachmentButtonComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AttachmentButtonComponent,
      multi: true,
    },
  ],
})
export class AttachmentButtonComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  media: Media;

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  prepareImage(files: FileList) {
    const image = files.item(0);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    const media = new Media({
      file: image,
      mediaType: MediaType.Image,
      isNew: true,
    });
    this.media = media;
    fileReader.onload = (e) => {
      media.url = fileReader.result as string;
      this.onChange(media);
    };
  }

  onChange;
  onTouched;

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.media = obj;
  }

  validate(control: FormControl) {
    const media = control.value as Media;
    if (media?.url || media?.file) {
      return null;
    }

    return {
      invalid: true,
    };
  }

  openImage(media) {
    this.dialog.open(ImagePreviewComponent, {
      data: [media],
      width: 'calc(100vw - 0.001px)', // not 100vw, to prevent displaying thumbnail while dragging image
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'bg-trasparent',
    });
  }
}
