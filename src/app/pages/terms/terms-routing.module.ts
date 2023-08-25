import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TermsComponent } from './terms/terms.component';

const routes: Route[] = [{ path: '', component: TermsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsRoutingModule {}
