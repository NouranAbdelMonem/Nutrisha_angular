import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTagCreateComponent } from './blog-tag-create.component';

describe('BlogTagCreateComponent', () => {
  let component: BlogTagCreateComponent;
  let fixture: ComponentFixture<BlogTagCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogTagCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogTagCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
