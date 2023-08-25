import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekTabsComponent } from './day-of-week-tabs.component';

describe('DayOfWeekTabsComponent', () => {
  let component: DayOfWeekTabsComponent;
  let fixture: ComponentFixture<DayOfWeekTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayOfWeekTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
