import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddEditBlogCategoryService } from './add-edit-blog-category.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pb-add-edit-blog-category',
  templateUrl: './add-edit-blog-category.component.html',
  styleUrls: ['./add-edit-blog-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditBlogCategoryComponent implements OnInit {
  @ViewChild('textarea') public textarea: ElementRef;
  public urlInfo: any = {};
  public blogData: any = [];
  public categoryList: any = [];
  public is_published: boolean = false;
  public isImageFileUpload: boolean = true;
  public isLoading: Boolean = false;
  public constants: any = {
    addRouteUrl: 'add-blog-category',
    editRouteUrl: 'edit-blog-category',
    viewRouteUrl: 'view-blog-category'
  };
  constructor(private injector: Injector, private router: Router, private activatedRoute: ActivatedRoute) {
    this.urlInfo.currentState = this.activatedRoute.url['value'][0].path;
    if (this.activatedRoute.url['value'][1]) {
      this.urlInfo.currentId = parseInt(this.activatedRoute.url['value'][1].path, 10);
    }
  }

  ngOnInit() {
    if (this.urlInfo.currentState !== this.constants['addRouteUrl']) {
      this.getCategoryData();
    }
  }

  resizeFunction() {
    const textarea = this.textarea.nativeElement;
    // Reset textarea height to auto that correctly calculate the new height
    textarea.style.height = 'auto';
    // Set new height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  /** Get specific blog data in edit blog page */
  public getCategoryData() {
    const params = {};
    this.isLoading = true;
    params['id'] = this.urlInfo.currentId;
    const addEditBlogCategoryService = this.injector.get(AddEditBlogCategoryService);
    addEditBlogCategoryService.getCategoryData(params).subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          this.blogData = response['data'];
        }
      },
      (error: HttpResponse<any>) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  /** Method on blog submit */
  public saveBlogCategory(form) {
    if (form['valid'] === true) {
      const formData: FormData = new FormData();
      this.makeFormDataParam(formData);
      if (this.urlInfo.currentState === this.constants['addRouteUrl']) {
        this.addBlog(formData);
      } else if (this.urlInfo.currentState === this.constants['editRouteUrl']) {
        this.updateBlog(formData);
      }
    }
  }

  public makeFormDataParam(formData) {
    for (const key in this.blogData) {
      if ((this.blogData[key] !== undefined && this.blogData[key] !== null) && key !== 'created_at' && key !== 'updated_at') {
        formData.append(key, this.blogData[key]);
      }
    }
  }

  public addBlog(formData) {
    const toastrService = this.injector.get(ToastrService);
    const addEditBlogCategoryService = this.injector.get(AddEditBlogCategoryService);
    addEditBlogCategoryService.addBlogs(formData).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          toastrService.success('Blog category added successfully', 'SUCCESS');
          const router = this.injector.get(Router);
          router.navigate(['/blog-category/blog-category-list']);
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }

  public updateBlog(formData) {
    const toastrService = this.injector.get(ToastrService);
    const addEditBlogCategoryService = this.injector.get(AddEditBlogCategoryService);
    addEditBlogCategoryService.updateBlogs(formData).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          toastrService.success('Blog category updated successfully', 'SUCCESS');
          const router = this.injector.get(Router);
          router.navigate(['/blog-category/blog-category-list']);
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }

  public onCloseImage() {
    this.blogData['file'] = undefined;
    this.isImageFileUpload = false;
  }

}
