import { Component, Inject, Input, OnInit } from '@angular/core';
import { Media } from '../../../../core/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit {
  @Input() media: Media[];
  constructor(
    private dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Media[]
  ) {
    this.media = data;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
