import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Media } from '../../../core/shared';
import { MealPlanService } from '../../../core/meal-plan/meal-plan.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-meal-plan-add-as-template',
  templateUrl: './meal-plan-add-as-template.component.html',
  styleUrls: ['./meal-plan-add-as-template.component.scss'],
})
export class MealPlanAddAsTemplateComponent implements OnInit {
  plan: any;
  form: FormGroup;
  isEdit: boolean;
  constructor(
    private dialogRef: MatDialogRef<MealPlanAddAsTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private mealPlanService: MealPlanService
  ) {
    this.plan = data;
  }

  ngOnInit(): void {
    if (this.plan.templateName) {
      this.isEdit = true;
    }

    this.form = new FormGroup({
      name: new FormControl(this.plan.templateName),
    });
  }

  submit() {
    this.plan.templateName = this.form.value.name;

    if (this.isEdit) {
      this.mealPlanService.put(this.plan).subscribe(() => {
        this.dialogRef.close({
          isNewPlan: false,
          id: this.plan.id,
        });
      });
    } else {
      this.mealPlanService.post(this.plan).subscribe((result) => {
        this.dialogRef.close({
          isNewPlan: true,
          id: result.data,
        });
      });
    }
  }
}
