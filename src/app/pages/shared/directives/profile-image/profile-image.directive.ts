import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'img [appProfileImage]',
})
export class ProfileImageDirective implements OnChanges {
  @Input() imageUrl: string;

  @Input() circularWidth: number;
  @Input() widthUnit = 'px';
  imgElement: HTMLImageElement;
  constructor(private elementRef: ElementRef) {
    this.imgElement = this.elementRef.nativeElement as HTMLImageElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let src = this.imageUrl;

    if (!this.imageUrl) {
      src = '../../../../../assets/media/no-profile-image.png';
    }

    this.elementRef.nativeElement.src = src;
    if (this.circularWidth) {
      this.imgElement.style.width = this.circularWidth + this.widthUnit;
      this.imgElement.style.height = this.circularWidth + this.widthUnit;
      this.imgElement.style.borderRadius =
        this.circularWidth / 2 + this.widthUnit;
    }
  }
}
