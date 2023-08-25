import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss'],
})
export class AddLinkComponent implements OnInit {
  linkForm = new FormGroup({
    link: new FormControl(null, [Validators.required]),
    placeHolder: new FormControl(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<AddLinkComponent>) {}

  ngOnInit(): void {}
}
