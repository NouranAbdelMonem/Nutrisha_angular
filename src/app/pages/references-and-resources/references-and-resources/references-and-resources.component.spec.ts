import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesAndResourcesComponent } from './references-and-resources.component';

describe('ReferencesAndResourcesComponent', () => {
  let component: ReferencesAndResourcesComponent;
  let fixture: ComponentFixture<ReferencesAndResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesAndResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesAndResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
