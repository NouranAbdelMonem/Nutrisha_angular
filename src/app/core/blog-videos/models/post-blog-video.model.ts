import { Media } from '../../shared/models/media';

export interface PostBlogVideoModel {
  subject: string;
  tagId: string;
  media: Media[];
  id: string;
}
