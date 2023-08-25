import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePremiumComponent } from './make-premium.component';

describe('MakePremiumComponent', () => {
  let component: MakePremiumComponent;
  let fixture: ComponentFixture<MakePremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePremiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
