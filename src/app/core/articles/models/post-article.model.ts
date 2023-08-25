import { Media, LocalizedObject } from '../../shared';

export interface PostArticleModel {
  subject: string;
  description: LocalizedObject;
  tagId: string;
  media: Media[];
  id: string;
}
