import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Route[] = [{ path: '', component: PrivacyComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyRoutingModule {}
