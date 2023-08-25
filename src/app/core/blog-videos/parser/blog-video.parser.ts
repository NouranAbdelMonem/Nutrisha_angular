import { Media, MediaFlags } from '../../shared';
import { BlogVideoDetailsModel } from '../models/blog-video-details.models';
import { BLogVideoDetailsViewModel } from '../view-models/blog-video-details.view.model';

export class BlogVideoParser {
  static toViewModel(model: BlogVideoDetailsModel): BLogVideoDetailsViewModel {
    const viewModel = new BLogVideoDetailsViewModel();

    Object.assign(viewModel, model);
    viewModel.coverImage = Media.getMediaByFlag(
      model.media,
      MediaFlags.CoverImage
    );
    viewModel.mainVideo = Media.getMediaByFlag(
      model.media,
      MediaFlags.MainMedia
    );
    return viewModel;
  }
  static toModel(viewModel: BLogVideoDetailsViewModel): BlogVideoDetailsModel {
    const model = new BlogVideoDetailsModel();

    Object.assign(model, viewModel);
    viewModel.mainVideo[0].flags = ['MainMedia'];
    let media = [...viewModel.mainVideo];
    if (viewModel.coverImage && viewModel.coverImage.length) {
      viewModel.coverImage[0].flags = ['CoverImage'];
      media = [...media, ...viewModel.coverImage];
    }
    model.media = media;
    return model;
  }
}
