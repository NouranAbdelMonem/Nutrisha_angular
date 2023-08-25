import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Media } from '../../../../core/shared/models/media';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() media: Media;
  constructor(
    private dialogRef: MatDialogRef<VideoPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Media
  ) {
    this.media = data;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
