import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogVideoDetailsComponent } from './blog-video-details.component';

describe('BlogVideoDetailsComponent', () => {
  let component: BlogVideoDetailsComponent;
  let fixture: ComponentFixture<BlogVideoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogVideoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogVideoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
