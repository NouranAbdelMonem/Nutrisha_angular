import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReferencesAndResourcesComponent } from './references-and-resources/references-and-resources.component';

const routes: Route[] = [{ path: '', component: ReferencesAndResourcesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencesAndResourcesRoutingModule {}
