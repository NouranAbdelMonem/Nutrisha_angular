import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserMoreInfoDialogComponent } from './mobile-user-more-info-dialog.component';

describe('MobileUserMoreInfoDialogComponent', () => {
  let component: MobileUserMoreInfoDialogComponent;
  let fixture: ComponentFixture<MobileUserMoreInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileUserMoreInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileUserMoreInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
