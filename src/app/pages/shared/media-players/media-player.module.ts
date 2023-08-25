import { NgModule } from '@angular/core';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CommonModule } from '@angular/common';
import { VideoLinkPipe } from './pipes/video-link.pipe';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

@NgModule({
  declarations: [VideoPlayerComponent, VideoLinkPipe, ImagePreviewComponent],
  imports: [CommonModule],
  exports: [VideoPlayerComponent, VideoLinkPipe],
})
export class MediaPlayerModule {}
