import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBlogCategoryComponent } from './add-edit-blog-category.component';

describe('BlogComponent', () => {
  let component: AddEditBlogCategoryComponent;
  let fixture: ComponentFixture<AddEditBlogCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBlogCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
