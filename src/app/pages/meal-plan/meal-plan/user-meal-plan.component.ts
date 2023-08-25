import { Component, OnDestroy, OnInit } from '@angular/core';
import { DayOfWeek } from '../../../core/shared/models/day-of-week';
import { MatDialog } from '@angular/material/dialog';
import { MealPlanAddAsTemplateComponent } from '../meal-plan-add-as-template/meal-plan-add-as-template.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { enumExtensions } from '../../../core/shared/extensions/enum-extensions';
import { MealService } from '../../../core/meals/meal.service';
import {
  getMealTypeByKey,
  MealType,
} from '../../../core/meals/models/meal-type.enum';
import { LookupItemModel } from '../../../core/shared/models/lookup-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  firstValueFrom,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { MealPlanService } from '../../../core/meal-plan/meal-plan.service';
import { toViewModel } from '../../../core/meal-plan/models/plan-details.model';
import { MealPlanViewModel } from '../../../core/meal-plan/models/meal-plan-view.model';
import { DateUtils } from '../../../core/shared/extensions/date-utils';
import { Select } from '@ngxs/store';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmDialogComponent } from '../../../core/shared/confirm-dialog/confirm-dialog.component';

export class MealLookUp {
  breakfast: LookupItemModel[] = [];
  lunch: LookupItemModel[] = [];
  dinner: LookupItemModel[] = [];
  snacks: LookupItemModel[] = [];
  supplements: LookupItemModel[] = [];
}

@Component({
  selector: 'app-meal-plan',
  templateUrl: './user-meal-plan.component.html',
  styleUrls: ['./user-meal-plan.component.scss'],
})
export class UserMealPlanComponent implements OnInit, OnDestroy {
  MAX_MEAL_PER_MENU = 4;

  dayOfWeek = DayOfWeek;
  selectedDay = DayOfWeek.SATURDAY.toString();
  dayOfWeekValues = enumExtensions.getEnumValues(DayOfWeek);

  planDetails: MealPlanViewModel;

  // user or template
  templateId;
  userId;
  isPlanEdited: boolean;
  isFromTemplatePage: boolean = true;
  currentUserId: string;
  isOwned: boolean;

  // Forms
  startDateControl: FormControl;
  planForm: FormGroup;

  // Look UP
  mealsLookUpStore = new MealLookUp();
  meals$ = new BehaviorSubject<LookupItemModel[]>([]);

  currentDate: Date;

  @Select((state) => state.currentUser.user.id)
  currentUserId$: Observable<string>;

  // CleanUP
  private _unsubscribe = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private mealService: MealService,
    public activatedRoute: ActivatedRoute,
    private mealPlanService: MealPlanService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.initializeForm();

    this.currentUserId$.pipe(takeUntil(this._unsubscribe)).subscribe((id) => {
      this.currentUserId = id;
    });

    this.mealService
      .getMealsLookUp()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((result) => {
        this.mealsLookUpStore = {
          breakfast: result.data[MealType.Breakfast] ?? [],
          lunch: result.data[MealType.Lunch] ?? [],
          dinner: result.data[MealType.Dinner] ?? [],
          snacks: result.data[MealType.Snacks] ?? [],
          supplements: result.data[MealType.Supplements] ?? [],
        };
      });

    const params = await firstValueFrom(this.activatedRoute.params);
    this.templateId = params['templateId'];
    this.userId = params['userId'];

    if (this.userId) {
      this.isFromTemplatePage = false;
      this.currentDate = new Date();
      this.startDateControl = new FormControl(null, Validators.required);
    }

    if (this.templateId) {
      this.loadTemplate(this.templateId);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  loadTemplate(id) {
    this.mealPlanService
      .GetTemplateById(id)
      .pipe(map((details) => toViewModel(details.data)))
      .subscribe((result) => {
        this.planDetails = result;
        this.initializeForm();
      });
  }

  createMealFormGroup(initialValue: any[] = []) {
    return new FormArray(
      (initialValue || []).map((value) => new FormControl(value)),
      [Validators.required]
    );
  }

  appendMealFormToFormArray(formArray: FormArray, value = null) {
    formArray.push(new FormControl(value, [Validators.required]));
  }

  daySelected(dayOfWeek: DayOfWeek) {
    this.selectedDay = dayOfWeek.toString();
  }

  searchMeals(mealType: string, value: string) {
    if (!value) {
      this.meals$.next(this.mealsLookUpStore[mealType]);
      return;
    }

    const filteredMeals = (this.mealsLookUpStore[mealType] || []).filter(
      (meal) => meal.name.toLowerCase().includes(value)
    );

    this.meals$.next(filteredMeals);
  }

  openSaveAsTemplate() {
    const plan = this.preparePlan();
    plan.id = this.templateId;
    plan.IsTemplate = true;

    if (this.templateId) {
      plan.parentTempletas = this.planDetails.parentTemplates;
      if (this.planDetails.createdBy.id == this.currentUserId) {
        plan.templateName = this.planDetails.templateName;
      } else {
        plan.templateName = null;
        plan.parentTempletas.push(this.planDetails.templateName);
        plan.templateId = this.templateId;
      }
    }

    const dialog = this.matDialog.open(MealPlanAddAsTemplateComponent, {
      data: plan,
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe(async (result) => {
        if (!result) {
          return;
        }
        this.isPlanEdited = false;
        const { isNewPlan, id } = result;
        if (!isNewPlan) {
          this.loadTemplate(id);
          return;
        }

        if (this.userId) {
          await this.router.navigateByUrl(
            'plans/templates/' +
              this.templateId +
              '/user/' +
              this.userId +
              '/edit'
          );
        } else {
          this.loadTemplate(id);
          await this.router.navigateByUrl(`plans/templates/edit/${id}`);
        }
      });
  }

  async submit() {
    const plan = this.preparePlan();
    const params = await firstValueFrom(this.activatedRoute.params);
    plan.userId = params['userId'];

    plan.startDate = DateUtils.toUTC(this.startDateControl.value);

    plan.templateId = this.templateId;
    plan.IsTemplate = false;
    this.mealPlanService
      .post(plan)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(async () => {
        await this.router.navigateByUrl(`app/users/${plan.userId}`);
      });
  }

  private initializeForm() {
    this.isOwned = JSON.parse(localStorage.getItem('isOwned'));
    console.log(this.isOwned);

    this.planForm = new FormGroup({
      [DayOfWeek.SATURDAY]: this.createDayForm(DayOfWeek.SATURDAY),
      [DayOfWeek.SUNDAY]: this.createDayForm(DayOfWeek.SUNDAY),
      [DayOfWeek.MONDAY]: this.createDayForm(DayOfWeek.MONDAY),
      [DayOfWeek.TUESDAY]: this.createDayForm(DayOfWeek.TUESDAY),
      [DayOfWeek.WEDNESDAY]: this.createDayForm(DayOfWeek.WEDNESDAY),
      [DayOfWeek.THURSDAY]: this.createDayForm(DayOfWeek.THURSDAY),
      [DayOfWeek.FRIDAY]: this.createDayForm(DayOfWeek.FRIDAY),
      notes: new FormControl(this.planDetails?.notes),
    });

    this.planForm.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this.isPlanEdited = true;
      });
  }

  private createDayForm(day: any) {
    let planDay: any;
    if (this.planDetails) {
      planDay = this.planDetails[day];
    }

    return new FormGroup({
      breakfast: this.createMealFormGroup(planDay?.Breakfast),
      lunch: this.createMealFormGroup(planDay?.Lunch),
      dinner: this.createMealFormGroup(planDay?.Dinner),
      snacks: this.createMealFormGroup(planDay?.Snacks),
      supplements: this.createMealFormGroup(planDay?.Supplements),
    });
  }

  private preparePlan(): any {
    return {
      meals: this.prepareMeals(),
      notes: this.planForm.value.notes,
    };
  }

  private prepareMeals() {
    return Object.keys(this.planForm.value)
      .filter((m) => m !== 'notes')
      .map((m) => {
        return {
          day: m,
          menus: this.getMealIds(m),
        };
      });
  }

  private getMealIds(dayOfWeek: string) {
    const dayMeals = this.planForm.value[dayOfWeek];
    return Object.keys(dayMeals).map((key) => ({
      type: getMealTypeByKey(key),
      mealIds: dayMeals[key].map((meal) => meal.id),
    }));
  }

  deleteMealPlan() {
    this.matDialog
      .open(ConfirmDialogComponent, {})
      .afterClosed()
      .pipe(
        switchMap((d) => {
          if (d) {
            return this.mealPlanService
              .delete(this.planDetails.id)
              .pipe(tap((r) => this.router.navigateByUrl('plans/templates')));
          }

          return of(false);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
