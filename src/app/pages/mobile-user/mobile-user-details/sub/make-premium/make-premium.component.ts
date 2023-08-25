import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MobileUserService } from '../../../../../core/mobile-users';
import moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-make-premium',
  templateUrl: './make-premium.component.html',
  styleUrls: ['./make-premium.component.scss'],
})
export class MakePremiumComponent implements OnInit {
  endDate: Date;
  makePremiumForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: { userId: string },
    private mobileUserService: MobileUserService
  ) {}

  ngOnInit(): void {
    this.makePremiumForm = new FormGroup({
      endDate: new FormControl(moment(), [Validators.required]),
      amount: new FormControl(0, [
        Validators.required,
        (control) => {
          if (!Number.isInteger(control.value) || control.value < 0) {
            return { min: true };
          }
          return null;
        },
      ]),
    });
  }

  makePremium() {
    if (this.makePremiumForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.mobileUserService
      .makePremium({
        userId: this.data.userId,
        endDate: moment(this.makePremiumForm.value.endDate).utc().toDate(),
        amountPaid: this.makePremiumForm.value.amount,
      })
      .pipe(
        tap((r) => {
          this.matDialogRef.close(true);
        })
      )
      .subscribe();
  }

  close() {
    this.matDialogRef.close(false);
  }

  minDateFilter = (d: Date | null): boolean => {
    const m = moment(d);
    const minDate = moment();
    return m.isAfter(minDate, 'days');
  };
}
