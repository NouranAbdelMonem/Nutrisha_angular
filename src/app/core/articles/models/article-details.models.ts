import { BlogTagDetailsModel } from '../../blogs';
import { LocalizedObject, Media, OwnerModel, TotalsModel } from '../../shared';

export class ArticleDetailsModel {
  id: string;
  subject: string;
  totals: TotalsModel;
  created: Date;
  owner: OwnerModel;
  description: LocalizedObject;
  coverImage: Media;
  media: Media[];
  tag: BlogTagDetailsModel;
}
