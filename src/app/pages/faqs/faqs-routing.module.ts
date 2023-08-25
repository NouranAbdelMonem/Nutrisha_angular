import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Route[] = [{ path: '', component: FaqsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqsRoutingModule {}
