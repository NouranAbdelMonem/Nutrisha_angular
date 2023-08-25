import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MobileUserService } from '../../../../../core/mobile-users';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-mobile-user-more-info-dialog',
  templateUrl: './mobile-user-more-info-dialog.component.html',
  styleUrls: ['./mobile-user-more-info-dialog.component.scss'],
})
export class MobileUserMoreInfoDialogComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  userPersonalData: {
    activityLevel;
    numberOfMealsPerDay;
    eatReason;
    targetWeight;
    medicineNames;
    isRegularMeasurer;
    hasBaby;
    goal: string;
    files: { url: string; fileName: string; created: Date }[];
  };

  private _unsubscribe = new Subject<void>();
  constructor(
    // private httpClient: HttpClient,
    private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: { userId: string },
    private mobileUserService: MobileUserService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.mobileUserService
      .getUserPersonalDetails(this.data.userId)
      .pipe(
        takeUntil(this._unsubscribe),
        tap((result) => {
          this.userPersonalData = result.data;
          console.log(result);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  // download(url: string, fileName: string) {
  //   this.httpClient
  //     .get(url, {
  //       responseType: 'blob',
  //     })
  //     .subscribe((res) => {
  //       const link = document.createElement('a');
  //       const downloadURL = URL.createObjectURL(res);
  //       link.setAttribute('href', downloadURL);
  //       link.setAttribute('download', fileName);
  //       document.body.appendChild(link);
  //       link.click();
  //       // document.removeChild(link);
  //     });
  // }
}
