import { BlogTagDetailsModel } from '../../blogs';
import { Media } from '../../shared/models/media';
import { LocalizedObject } from '../../shared/models/localized-object.model';

export class BLogVideoDetailsViewModel {
  id: string;
  subject: string;
  totals: Map<string, number>;
  created: Date;
  coverImage: Media[];
  // owner:OwnerModel;
  mainVideo: Media[];
  tag: BlogTagDetailsModel;
}
