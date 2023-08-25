import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogVideosListComponent } from './blog-videos-list.component';

describe('BlogVideosListComponent', () => {
  let component: BlogVideosListComponent;
  let fixture: ComponentFixture<BlogVideosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogVideosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogVideosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
