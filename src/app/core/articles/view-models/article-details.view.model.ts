import { BlogTagDetailsModel } from '../../blogs';
import { LocalizedObject, Media, OwnerModel, TotalsModel } from '../../shared';

export class ArticleDetailsViewModel {
  id: string;
  subject: string;
  totals: TotalsModel;
  created: Date;
  owner: OwnerModel;
  description: LocalizedObject;
  coverImage: Media[];
  additionalMedia: Media[];
  tag: BlogTagDetailsModel;
}
