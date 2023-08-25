import { ArticleDetailsModel } from '../models/article-details.models';
import { ArticleDetailsViewModel } from '../view-models/article-details.view.model';
import { Media } from '../../shared';

export class ArticleParser {
  static toViewModel(model: ArticleDetailsModel): ArticleDetailsViewModel {
    const viewModel = new ArticleDetailsViewModel();

    Object.assign(viewModel, model);
    viewModel.coverImage = Media.getMediaByFlag(model.media, 'CoverImage');

    viewModel.additionalMedia = Media.excludeMediaWithFlag(
      model.media,
      'CoverImage'
    );

    return viewModel;
  }

  // static toModel(): ArticleDetailsModel {
  //
  // }
}
