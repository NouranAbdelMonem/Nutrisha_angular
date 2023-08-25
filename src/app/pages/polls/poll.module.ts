import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../shared/material";
import {PollsComponent} from './base/polls.component';
import {PollRoutingModule} from "./polls-routing.module";
import {CreatePollComponent} from "./create-poll/create-poll.component";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {PollService} from "../../core/polls/poll.service";
import {PollsListComponent} from './polls-list/polls-list.component';
import {SharedModule} from "../shared/shared.module";
import {NgxsModule} from "@ngxs/store";
import {PollsState} from "../../core/store/polls/polls.state";
import {NgxPermissionsModule} from "ngx-permissions";


@NgModule({
  declarations: [
    PollsComponent,
    CreatePollComponent,
    PollsListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PollRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    SharedModule,
    NgxsModule.forFeature([PollsState]),
    NgxPermissionsModule.forChild()
  ],
  providers: [PollService]
})
export class PollModule {
}
