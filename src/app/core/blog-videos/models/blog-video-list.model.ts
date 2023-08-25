import { BlogTagDetailsModel } from '../../blogs';

export interface BlogVideoListModel {
  subject: string;
  tag: BlogTagDetailsModel;
  created: Date;
}
