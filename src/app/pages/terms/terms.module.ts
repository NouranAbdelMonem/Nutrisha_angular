import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TermsComponent } from './terms/terms.component';
import { CommonModule } from '@angular/common';
import { TermsRoutingModule } from './terms-routing.module';

@NgModule({
  declarations: [TermsComponent],
  imports: [CommonModule, TermsRoutingModule],
})
export class TermsModule {}
