import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';
import { CommonModule } from '@angular/common';
import { FaqsRoutingModule } from './faqs-routing.module';

@NgModule({
  declarations: [FaqsComponent],
  imports: [CommonModule, FaqsRoutingModule],
})
export class FaqsModule {}
