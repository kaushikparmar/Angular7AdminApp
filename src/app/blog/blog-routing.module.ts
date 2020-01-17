import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogCategoryListComponent } from './blog-category-list/blog-category-list.component';
import { AddEditBlogCategoryComponent } from './add-edit-blog-category/add-edit-blog-category.component';


const routes: Routes = [
      {
        path: 'blog',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blog-list'
          },
          {
            path: 'add-blog',
            data: { title: 'add-blog' },
            component: AddBlogComponent
          },
          {
            path: 'edit-blog/:id',
            data: { title: 'edit-blog' },
            component: AddBlogComponent
          },
          {
            path: 'view-blog/:id',
            data: { title: 'view-blog' },
            component: AddBlogComponent
          },
          {
            path: 'blog-list',
            data: { title: 'blog-list' },
            component: BlogListComponent
          },
        ]
      },
      {
        path: 'blog-category',
        children : [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blog-category-list'
          },
          {
            path: 'blog-category-list',
            data: { title: 'blog-category-list' },
            component: BlogCategoryListComponent
          },
          {
            path: 'add-blog-category',
            data: { title: 'add-blog-category' },
            component: AddEditBlogCategoryComponent
          },
          {
            path: 'edit-blog-category/:id',
            data: { title: 'edit-blog-category' },
            component: AddEditBlogCategoryComponent
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
