import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Route[] = [
  {
    path: 'my-profile',
    component: ProfileDetailsComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
