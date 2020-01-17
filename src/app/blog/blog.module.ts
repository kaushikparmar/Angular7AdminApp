import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from 'src/common/modules/shared.module';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddBlogService } from './add-blog/add-blog.service';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogListService } from './blog-list/blog-list.service';
import { BlogCategoryListComponent } from './blog-category-list/blog-category-list.component';
import { BlogCategoryListService } from './blog-category-list/blog-category-list.service';
import { AddEditBlogCategoryComponent } from './add-edit-blog-category/add-edit-blog-category.component';
import { AddEditBlogCategoryService } from './add-edit-blog-category/add-edit-blog-category.service';


@NgModule({
  declarations: [
    AddBlogComponent,
    BlogListComponent,
    BlogCategoryListComponent,
    AddEditBlogCategoryComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  providers: [
    BlogListService,
    AddBlogService,
    BlogCategoryListService,
    AddEditBlogCategoryService
  ]
})
export class BlogModule { }
