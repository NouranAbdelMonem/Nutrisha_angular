import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanAddAsTemplateComponent } from './meal-plan-add-as-template.component';

describe('MealPlanAddAsTemplateComponent', () => {
  let component: MealPlanAddAsTemplateComponent;
  let fixture: ComponentFixture<MealPlanAddAsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealPlanAddAsTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPlanAddAsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
