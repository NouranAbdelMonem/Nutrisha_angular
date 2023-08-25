import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BLogTagComponent } from './blog-tag.component';

describe('BLogTagComponent', () => {
  let component: BLogTagComponent;
  let fixture: ComponentFixture<BLogTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BLogTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BLogTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
