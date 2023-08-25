import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogTagCreateComponent } from './blog-tag-create/blog-tag-create.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BLogTagComponent } from './blog-tag.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { BlogTagService } from '../../core/blogs';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [BlogTagCreateComponent, BLogTagComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
  exports: [BLogTagComponent],
  providers: [BlogTagService],
})
export class BlogTagModule {}
