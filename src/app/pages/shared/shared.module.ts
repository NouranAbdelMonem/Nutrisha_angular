import { NgModule } from '@angular/core';
import { AttachmentComponent } from './attachment/attachment.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import { HoverObserverDirective } from '../../core/shared';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LocalizedInputComponent } from './localized-input/localized-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListFiltersComponent } from './list-filters/list-filters.component';
import { WithFlagPipe } from './attachment/pipes/with-flag.pipe';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ProfileImageDirective } from './directives/profile-image/profile-image.directive';
import { ArrayToStringPipe } from './pipes/array-to-string.pipe';
import { NoDataPlaceholderComponent } from './no-data-placeholder/no-data-placeholder.component';
import { RequiredValidatorsDirective } from './directives/validators/required-validators.directive';
import { AppRequestLoaderComponent } from './app-request-loader/app-request-loader.component';
import {
  NgxPermissionsModule,
  NgxPermissionsRestrictStubModule,
} from 'ngx-permissions';
import { AttachmentButtonComponent } from './attachment-button/attachment-button.component';
import { DetailsHeaderComponent } from './details-header/details-header.component';
import { EnumKeyPipe } from './pipes/enum-key.pipe';
import { DayOfWeekTabsComponent } from './day-of-week-tabs/day-of-week-tabs.component';
import { VideoValidatorDirective } from '../../core/shared/directives/extenal-video-validator.directive';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
@NgModule({
  declarations: [
    AttachmentComponent,
    VideoValidatorDirective,
    HoverObserverDirective,
    SideNavComponent,
    LocalizedInputComponent,
    ListFiltersComponent,
    WithFlagPipe,
    ListHeaderComponent,
    ProfileImageDirective,
    ArrayToStringPipe,
    NoDataPlaceholderComponent,
    RequiredValidatorsDirective,
    AppRequestLoaderComponent,
    AttachmentButtonComponent,
    DetailsHeaderComponent,
    EnumKeyPipe,
    DayOfWeekTabsComponent,
    SplashScreenComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    NgxPermissionsRestrictStubModule,
  ],
  exports: [
    AttachmentComponent,
    HoverObserverDirective,
    SideNavComponent,
    LocalizedInputComponent,
    ListFiltersComponent,
    WithFlagPipe,
    ListHeaderComponent,
    ProfileImageDirective,
    ArrayToStringPipe,
    NoDataPlaceholderComponent,
    AppRequestLoaderComponent,
    RequiredValidatorsDirective,
    AttachmentButtonComponent,
    DetailsHeaderComponent,
    EnumKeyPipe,
    DayOfWeekTabsComponent,
    SplashScreenComponent,
  ],
})
export class SharedModule {}
