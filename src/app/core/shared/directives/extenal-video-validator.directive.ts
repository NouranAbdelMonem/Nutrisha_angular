import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[externalVideoValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: VideoValidatorDirective,
      multi: true,
    },
  ],
})
export class VideoValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) return null;

    return this.videoValidator()(control);
  }

  videoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Regex for instagram, facebook, twitter, and azure uploaded videos
      var regExp =
        /(((https?:\/\/)?(?:www\.)?instagram\.com\/.*\/([^\/?#&]+)).*|(https?:\/\/)?(?:www\.|web\.|m\.)?facebook\.com\/.+|(https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(\?.*)?(?:\/.*)?$)/;
      var match =
        control.value.match(regExp) || this.matchYoutubeUrl(control.value);
      return !!match ? null : { invalidUrl: { value: control.value } };
    };
  }

  private matchYoutubeUrl(url: string): boolean {
    // Regex for youtube links
    var regExp =
      /^(https?:\/\/)?((www\.)?youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/;
    var match = url.match(regExp);
    return match && match[6] && match[6].length == 11;
  }
}
