/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlogCategoryListComponent } from './blog-category-list.component';
import { SharedModule } from '../../../common/modules/shared.module';
import { BlogRoutingModule } from '../blog-routing.module';

xdescribe('UserListComponent', () => {
  let component: BlogCategoryListComponent;
  let fixture: ComponentFixture<BlogCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCategoryListComponent ],
      imports: [
        BlogRoutingModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
