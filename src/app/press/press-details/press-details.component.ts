import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';

import { PressDetailsService } from './press-details.service';
import { HttpResponse } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
// import { ImageCropperModalComponent } from 'src/common/components/image-cropper-modal/image-cropper-modal.component';
import { ImgCropperModalComponent } from 'src/common/components/img-cropper-modal/img-cropper-modal.component';
import Quill from 'quill';
import Counter from '../../counter';
@Component({
  selector: 'pb-press',
  templateUrl: './press-details.component.html',
  styleUrls: ['./press-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PressDetailsComponent implements OnInit {

  public urlInfo: any = {};
  public blogData: any = [];
  public imageEvent: any = '';
  public categoryList: any = [];
  public isLoading: Boolean = false;
  public is_published: boolean = false;
  public isDescriptionInvalid: boolean = false;
  @ViewChild('uploadImageInput') public uploadImageInput;
  // public isImageFileUpload: boolean = true;
  public constants: any = {
    addRouteUrl: 'add-press',
    editRouteUrl: 'edit-press',
    viewRouteUrl: 'view-press'
  };
  constructor(private injector: Injector,  private dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
    this.urlInfo.currentState = this.activatedRoute.url['value'][0].path;
    if (this.activatedRoute.url['value'][1]) {
      this.urlInfo.currentId = parseInt(this.activatedRoute.url['value'][1].path, 10);
    }
    const Parchment = Quill.import('parchment');
    const Block = Parchment.query('block');
    Block.tagName = 'DIV';
        // or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
    Quill.register(Block /* or NewBlock */, true);
    Quill.register('modules/counter', Counter);
  }

  ngOnInit() {
    this.getCategories();
    if (this.urlInfo.currentState !== this.constants['addRouteUrl']) {
      this.getBlogData();
    }
  }


  public getCategories() {
    const params = {};
    params['status'] = true;
    const addBlogService = this.injector.get(PressDetailsService);
    addBlogService.getCategories(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.categoryList = response['data']['rows'];
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }

  /** Get specific press data in edit press page */
  public getBlogData() {
    this.isLoading = true;
    const params = {};
    params['press_id'] = this.urlInfo.currentId;
    // params['type'] = 2;
    params['expose'] = 1;
    params['isAdmin'] = 1;
    const addBlogService = this.injector.get(PressDetailsService);
    addBlogService.getBlogData(params).subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          this.blogData = response['data'];
          if (this.blogData.category_id) {
            this.blogData.category_id = this.blogData.category_id.toString();
          }
          if (this.blogData['file'] && this.blogData['file'] !== null) {
            this.blogData.fileUrl = `${environment.origin}/upload/press/${this.blogData['file']}`;
          }
        }
      },
      (error: HttpResponse<any>) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  public validateDescription() {
    if (!this.blogData.content) {
      this.isDescriptionInvalid = true;
    } else {
      const content = this.blogData.content.replace(/<\/?[^>]+(>|$)/g, '').split('');
      let contentSpaceCount = 0;
      content.forEach(contentElement => {
         if (contentElement === ' ') {
           contentSpaceCount++;
         }
      });
      if (content.length === contentSpaceCount) {
        this.isDescriptionInvalid = true;
      }
    }
  }

  /** Method on press submit */
  public saveBlog(form) {
    // if (!this.blogData.file) {
    //   this.isImageFileUpload = false;
    // }
    this.validateDescription();
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
    formData.append('is_published', (this.is_published) ? 1 : 0);
    for (const key in this.blogData) {
      if (this.blogData[key] && key !== 'created_at' && key !== 'updated_at' && key !== 'is_published'
      && key !== 'press_category' && key !== 'isLocalImageFile' && key !== 'fileUrl') {
        if (key === 'file') {
            if (Object.prototype.toString.call(this.blogData[key]) === '[object File]' || Object.prototype.toString.call(this.blogData[key]) === '[object Blob]') {
              formData.append(key, this.blogData[key]);
            }
        } else {
          formData.append(key, this.blogData[key]);
        }

      }
    }
    // if (this.urlInfo.currentState === this.constants['editRouteUrl']) {
    //   formData.delete('category_id');
    // }
  }

  public addBlog(formData) {
    this.isLoading = true;
    const toastrService = this.injector.get(ToastrService);
    const addBlogService = this.injector.get(PressDetailsService);
    addBlogService.addBlogs(formData).subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          toastrService.success('Press added successfully', 'SUCCESS');
          const router = this.injector.get(Router);
          router.navigate(['/press/press-list']);
        }
      },
      (error: HttpResponse<any>) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  public updateBlog(formData) {
    this.isLoading = true;
    const toastrService = this.injector.get(ToastrService);
    const addBlogService = this.injector.get(PressDetailsService);
    addBlogService.updateBlogs(formData).subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          toastrService.success('Press updated successfully', 'SUCCESS');
          const router = this.injector.get(Router);
          router.navigate(['/press/press-list']);
        }
      },
      (error: HttpResponse<any>) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  public onCloseImage() {
    this.blogData['file'] = undefined;
    // this.isImageFileUpload = false;
  }

  public onImageUpload(event) {
    // let erroFileSize: boolean = false;
    // let erroFileName: boolean = false;

    // if (event.target.files && event.target.files[0]) {
    //   if (event.target.files[0]['size'] > 2097152) {
    //     erroFileSize = true;
    //   }
    //   if (event.target.files[0]['type'] !== 'image/png' && event.target.files[0]['type'] !== 'image/jpeg'
    //     && event.target.files[0]['type'] !== 'image/jpg') {
    //     erroFileName = true;
    //   }
    //   if (erroFileSize === false &&  erroFileName === false) {
    //     if (event.target.files && event.target.files[0]) {
    //       this.imageEvent = event;
    //       this.openDialog();
    //     } else {
    //       this.uploadImageInput.nativeElement.value = '';
    //     }
    //   } else {
    //     if (erroFileSize === true ) {
    //       alert('Please select image max 2mb');
    //     }
    //     if (erroFileName === true ) {
    //       alert('Please select only png format');
    //     }
    //   }
    // }

    let erroFileSize: boolean = false;
    let erroFileName: boolean = false;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0]['size'] > 2097152) {
        erroFileSize = true;
      }
      if (event.target.files[0]['type'] !== 'image/png' && event.target.files[0]['type'] !== 'image/jpeg' && event.target.files[0]['type'] !== 'image/jpg') {
        erroFileName = true;
      }

      if (erroFileSize === false && erroFileName === false) {
        if (event.target.files && event.target.files[0]) {
          // this.imageEvent = event;
          // this.openDialog();
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (events) => {
            this.openImgCropperDialog(events.target['result']);
            this.uploadImageInput.nativeElement.value = '';
          };

        } else {
          this.uploadImageInput.nativeElement.value = '';
        }
      } else {
        if (erroFileSize === true) {
          alert('Please select image max 2mb');
          this.uploadImageInput.nativeElement.value = '';
        }
        if (erroFileName === true) {
          alert('Please select only png format');
          this.uploadImageInput.nativeElement.value = '';

        }
      }
    }
  }


  // public openDialog() {
  //   const dialogConfig = new MatDialogConfig();
  //   const dialogRef = this.dialog.open(ImageCropperModalComponent , {data: this.imageEvent , width: '600px'});
  //   dialogRef.afterClosed().subscribe(value => {
  //     if (value) {
  //       this.blogData.file = value.file;
  //       this.blogData.fileUrl = value['base64'];
  //       this.uploadImageInput.nativeElement.value = '';
  //     } else {
  //       this.uploadImageInput.nativeElement.value = '';
  //       }
  //   });
  // }


  /**
   * Open Common Image Cropper Component To Implement Croppping
   * @param Path provide path of the selected image
   */
  public openImgCropperDialog(path: any): void {
    const dialogRef = this.dialog.open(ImgCropperModalComponent, {
      // width: '550px',
      data: {
        file: path,
        centerTouchRadius: 100,
        canvasWidth: 400,
        canvasHeight: 300,
        cropperMinWidth : 100,
        cropperMinHeight : 100,
        croppedOutputWidth : 200,
        croppedOutputHeight : 200,
        noFileInput: true,
        rounded: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.blogData.fileUrl = result.image;
      this.blogData.file = result.file;
    });
  }
}
