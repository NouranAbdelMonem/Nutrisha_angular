import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizedInputComponent } from './localized-input.component';

describe('LocalizedInputComponent', () => {
  let component: LocalizedInputComponent;
  let fixture: ComponentFixture<LocalizedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizedInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
