import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { colorValidator } from '../../../core/shared';

const defaultTagColor = '#000000';

@Component({
  selector: 'app-blog-tag-create',
  templateUrl: './blog-tag-create.component.html',
  styleUrls: ['./blog-tag-create.component.scss'],
})
export class BlogTagCreateComponent implements OnInit {
  blogForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<BlogTagCreateComponent>) {}

  ngOnInit(): void {
    this.blogForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      color: new FormControl(defaultTagColor, [
        Validators.required,
        colorValidator,
        ({ value }: AbstractControl) => {
          if (value == '#ffffff') {
            return [
              {
                invalidColor: '',
              },
            ];
          }

          return null;
        },
      ]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.blogForm.value });
  }
}
