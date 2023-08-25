import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextComponent } from './rich-text/rich-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AddLinkComponent } from './add-link/add-link.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [RichTextComponent, AddLinkComponent],
  exports: [RichTextComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    NgxEditorModule,
  ],
})
export class RichTextModule {}
