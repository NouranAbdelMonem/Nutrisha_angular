import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileUserActions } from '../../../core/store/mobile-users/mobile-user.actions';
import { Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import {
  MobileUserDetailsModel,
  MobileUserDetailsViewModel,
  MobileUserService,
} from '../../../core/mobile-users';
import { MealPlanService } from '../../../core/meal-plan/meal-plan.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DayOfWeek } from '../../../core/shared/models/day-of-week';
import { MealType } from '../../../core/meals/models/meal-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { MobileUserMoreInfoDialogComponent } from './sub/mobile-user-more-info-dialog/mobile-user-more-info-dialog.component';
import { TranslationService } from '../../../core/shared';
import { ConfirmDialogComponent } from '../../../core/shared/confirm-dialog/confirm-dialog.component';
import { MakePremiumComponent } from './sub/make-premium/make-premium.component';

@UntilDestroy()
@Component({
  selector: 'app-mobile-user-details',
  templateUrl: './mobile-user-details.component.html',
  styleUrls: ['./mobile-user-details.component.scss'],
})
export class MobileUserDetailsComponent implements OnInit {
  userDetails: MobileUserDetailsViewModel;
  mealTypes = MealType;

  userId: string;
  currentPlanSelectedDay = DayOfWeek.SATURDAY;
  lastPlanSelectedDay = DayOfWeek.SATURDAY;

  @Select((state) => state.mobileUsers.lastLoadedUser)
  user$: Observable<MobileUserDetailsViewModel>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private matDialog: MatDialog,
    private translateService: TranslationService,
    private mobileUserService: MobileUserService,
    private mealPlanService: MealPlanService
    
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
      this.loadUserDetails(params['id']);
    });

    this.user$
      .pipe(untilDestroyed(this))
      .subscribe((u) => {
        this.userDetails = u;
      });
      //.subscribe((u) => (this.userDetails = u));
  }

  loadUserDetails(id: string) {
    this.store.dispatch(new MobileUserActions.LoadUserDetails(id));
  }

  openMoreDetailsDialog() {
    this.matDialog.open(MobileUserMoreInfoDialogComponent, {
      data: { userId: this.userId },
      direction: this.translateService.dir,
    });
  }

  banUser(id: string) {
    this.matDialog
      .open(ConfirmDialogComponent, {})
      .afterClosed()
      .pipe(
        switchMap((response) => {
          if (response) {
            this.mobileUserService.ban(id).subscribe((result) => {
              console.log(result);
              if(result.statusCode == 200) {
                 if(result.done == true) {
                  this.userDetails.isBanned = true;
                 }
              }
            });
          }

          return of(false);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  unBanUser(id: string) {
    this.matDialog
      .open(ConfirmDialogComponent, {})
      .afterClosed()
      .pipe(
        switchMap((response) => {
          if (response) {
            this.mobileUserService.unBan(id).subscribe((result) => {
              console.log(result);
              if(result.statusCode == 200) {
                 if(result.done == true) {
                  this.userDetails.isBanned = false;
                 }
              }
            });
          }

          return of(false);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  deleteMealPlan(mealPlanId: number,userId:string) {
  
    this.matDialog
      .open(ConfirmDialogComponent, {})
      .afterClosed()
      .pipe(
        switchMap((d) => {
          if (d) {
            return this.mealPlanService
              .delete(mealPlanId.toString()).pipe(
                tap(async () => {
                  await this.router.navigateByUrl(`/app/users`);
                }));
          }
 
          return of(false);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
  openMakePremiumDialog() {
    const makePremiumDialog = this.matDialog.open(MakePremiumComponent, {
      data: { userId: this.userId },
      direction: this.translateService.dir,
    });

    makePremiumDialog
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((success) => {
        if (!success) {
          return;
        }

        this.loadUserDetails(this.userId);
      });
  }
}
