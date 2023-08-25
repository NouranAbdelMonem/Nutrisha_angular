import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestLoaderComponent } from './app-request-loader.component';

describe('AppRequestLoaderComponent', () => {
  let component: AppRequestLoaderComponent;
  let fixture: ComponentFixture<AppRequestLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRequestLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRequestLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
