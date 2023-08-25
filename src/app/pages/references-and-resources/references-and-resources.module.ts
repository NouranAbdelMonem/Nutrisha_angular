import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReferencesAndResourcesComponent } from './references-and-resources/references-and-resources.component';
import { CommonModule } from '@angular/common';
import { ReferencesAndResourcesRoutingModule } from './references-and-resources-routing.module';

@NgModule({
  declarations: [ReferencesAndResourcesComponent],
  imports: [CommonModule, ReferencesAndResourcesRoutingModule],
})
export class ReferencesAndResourcesModule {}
