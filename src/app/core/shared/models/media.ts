import { AbstractControl, ValidationErrors } from '@angular/forms';

export class Media {
  constructor(media: Partial<Media>) {
    Object.assign(this, media);
  }

  id: string;
  file: File;
  flags: string[];
  url: string;
  mediaType: MediaType;
  removed: boolean;
  isNew: boolean;

  static getMediaByFlag(media: Media[], flag: string): Media[] {
    return media?.filter((m) => m.flags && m.flags.some((f) => f == flag));
  }

  static excludeMediaWithFlag(media: Media[], flag: string): Media[] {
    return media?.filter(
      (m) => !m.flags || (m.flags && !m.flags.some((f) => f == flag))
    );
  }
}

export enum MediaType {
  Image = 0,
  Video = 1,
  Youtube = 2,
  Facebook = 3,
  Gif = 4,
}

const regexFacebook1 = new RegExp(
  '^(https?://)?(?:www.|web.|m.)?facebook.com/.+'
);
const regexFacebook2 = new RegExp('^(https?://)?(?:www.|web.|m.|fb.)?watch/.+');
const youtubeRegex = new RegExp(
  '^(https?://)?((www.|m.)?youtube.com|youtu.be)/(watch)?(v=)?(S+)?'
);
export class ExternalMediaValidator {
  // var regexYoutube = GetYoutubeRegex();
  // var regexInstagram = new Regex(@"^(((https?:\/\/)?(?:www\.)?instagram\.com\/.*\/([^\/?#&]+)).*)");
  // var regexFacebook1 = new Regex(@"^(https?:\/\/)?(?:www\.|web\.|m\.)?facebook\.com\/.+");
  // var regexFacebook2 = new Regex(@"^(https?:\/\/)?(?:www\.|web\.|m\.|fb\.)?watch\/.+");
  // var regexTwitter = new Regex(@"^(https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(\?.*)?(?:\/.*)?$");
  // var regexVideoStream = new Regex(@"^((https?:\/\/)?(?:www\.)?.*\.streaming.media.azure.net\/.*)");
  // var regexVideo = new Regex(@"^((https?:\/\/)?(?:www\.)?.*\.blob.core.windows.net\/.*)");

  static validate(control: AbstractControl): ValidationErrors {
    const link = control.value;
    if (regexFacebook1.test(link) || regexFacebook2.test(link)) {
      return null;
    }

    if (youtubeRegex.test(link)) {
      return null;
    }

    // setTimeout(() => control.setErrors({}), 0.1);
    return [];
  }

  static getLinkVideoType(link: string): MediaType | null {
    if (regexFacebook1.test(link) || regexFacebook2.test(link)) {
      return MediaType.Facebook;
    }

    if (youtubeRegex.test(link)) {
      return MediaType.Youtube;
    }

    return null;
  }
}

export namespace MediaFlags {
  export const CoverImage = 'CoverImage';
  export const MainMedia = 'MainMedia';
}
