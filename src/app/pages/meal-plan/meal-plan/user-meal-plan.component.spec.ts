import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMealPlanComponent } from './user-meal-plan.component';

describe('MealPlanComponent', () => {
  let component: UserMealPlanComponent;
  let fixture: ComponentFixture<UserMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMealPlanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
