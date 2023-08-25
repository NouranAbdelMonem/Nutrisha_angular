import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTemplatesListComponent } from './plan-templates-list.component';

describe('PlanTemplatesListComponent', () => {
  let component: PlanTemplatesListComponent;
  let fixture: ComponentFixture<PlanTemplatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanTemplatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
