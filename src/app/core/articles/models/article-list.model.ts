import { BlogTagDetailsModel } from '../../blogs';
import { LocalizedObject, Media, OwnerModel, TotalsModel } from '../../shared';

export interface ArticleListModel {
  subject: string;
  description: LocalizedObject;
  owner: OwnerModel;
  totals: TotalsModel;
  tag: BlogTagDetailsModel;
  media: Media[];
}
