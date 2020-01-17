// ANGULAR LIBRARY IMPORTS
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
// EXTERNAL LIBRARY IMPORTS
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
// CUSTOM IMPORTS
import { HomeContentService } from './home-content.service';
import { ImgCropperModalComponent } from 'src/common/components/img-cropper-modal/img-cropper-modal.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'pb-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  // FORM INSTANCE
  @ViewChild('updateContentForm') public updateContentForm: NgForm;
  // GET THE TEMPLATE VARIABLE INSTANCE FOR SECTION-2 IMAGE UPLOAD
  @ViewChild('uploadImageInputSection2') public uploadImageInputSection2;
  // GET THE TEMPLATE VARIABLE INSTANCE FOR SECTION-3 IMAGE UPLOAD
  @ViewChild('uploadImageInputSection3') public uploadImageInputSection3;
  // SHOW/HIDE LOADING ELEMENT
  public isLoading: Boolean = false;
  // HOLD THE FORM DATA OF ALL FIELDS
  public formContent: any = {};
  // HOLD THE SECTION-2 IMAGE DATA
  public section2ImageData: any = [];
  // HOLD THE SECTION-3 IMAGE DATA
  public section3ImageData: any = [];
  // HOLD THE VIEW TYPE
  private view = 'edit';
  // HOLD CROPPED IMAGE WITH FOR SECTION 2
  public croppedImageWidthForSection2: number;
  // HOLD CROPPED IMAGE HEIGHT FOR SECTION 2
  public croppedImageHeightForSection2: number;
  // HOLD CROPPED IMAGE WITH FOR SECTION 2
  public croppedImageWidthForSection3: number;
  // HOLD CROPPED IMAGE HEIGHT FOR SECTION 2
  public croppedImageHeightForSection3: number;
  // SECTION-2 IMAGE NAME
  public imageNameSection2: string = '';
  // SECTION-3 IMAGE NAME
  public imageNameSection3: string = '';

  /**
   * CONSTRUCTOR OF THE CLASS FOR INSTANCE INITIALIZATION
   * @param injector TO HANDLE DYNAMIC DEPENDENCY INJECTION
   */
  constructor(private injector: Injector) { }

  /**
   * ANGULAR LIFECYCLE EVENT FOR COMPONENT INITIALIZATION
   */
  public ngOnInit(): void {
    // GET HOME CONTENT DATA FROM API
    this.getHomeContent();
  }

  /**
   * HANDLE SECTION-2 IMAGE UPLOAD
   * @param $event EVENT COMING FROM UPLOAD ACTION
   */
  public onImageUploadSection2(event: any): void {
    let erroFileSize: boolean = false;
    let erroFiletype: boolean = false;
    // CHECK SELECTED FILE'S TYPE
    const fileType = ['image/png', 'image/jpeg', 'image/jpg'];
    if (event.target.files && event.target.files[0]) {
      // SET IMAGE NAME
      this.imageNameSection2 = event.target.files[0]['name'];
      // VALIDATE FILE SIZE
      if (event.target.files[0]['size'] > 2097152) {
        erroFileSize = true;
        this.updateContentForm.controls['section2_image'].setErrors({'sizeExceeds': true});
      } else {
        this.updateContentForm.controls['section2_image'].setErrors({ 'sizeExceeds': false });
      }
      // VALIDATE FILE TYPE
      if (fileType.indexOf(event.target.files[0]['type']) === -1) {
        erroFiletype = true;
        this.updateContentForm.controls['section2_image'].setErrors({ 'fileType': true });
      } else {
        this.updateContentForm.controls['section2_image'].setErrors({ 'fileType': false });
      }
      // IF FILE IS VALID THEN PROCESS
      if (erroFileSize === false && erroFiletype === false) {
        // GET FileReader INSTANCE
        const reader = new FileReader();
        // READ THE DATA FROM FILE SELECTED
        reader.readAsDataURL(event.target.files[0]);
        // OPEN CROPPING MODAL
        reader.onload = (events) => {
          this.openImgCropperDialogForSection2(events.target['result']);
          this.uploadImageInputSection2.nativeElement.value = '';
        };
      }
    }
  }

  /**
   * HANDLE SECTION-2 IMAGE UPLOAD
   * @param $event EVENT COMING FROM UPLOAD ACTION
   */
  public onImageUploadSection3(event: any): void {
    let erroFileSize: boolean = false;
    let erroFiletype: boolean = false;
    // CHECK SELECTED FILE'S TYPE
    const fileType = ['image/png', 'image/jpeg', 'image/jpg'];
    if (event.target.files && event.target.files[0]) {
      // SET IMAGE NAME
      this.imageNameSection3 = event.target.files[0]['name'];
      // VALIDATE FILE SIZE
      if (event.target.files[0]['size'] > 2097152) {
        erroFileSize = true;
        this.updateContentForm.controls['section3_image'].setErrors({ 'sizeExceeds': true });
      } else {
        this.updateContentForm.controls['section3_image'].setErrors({ 'sizeExceeds': false });
      }
      // VALIDATE FILE TYPE
      if (fileType.indexOf(event.target.files[0]['type']) === -1) {
        erroFiletype = true;
        this.updateContentForm.controls['section3_image'].setErrors({ 'fileType': true });
      } else {
        this.updateContentForm.controls['section3_image'].setErrors({ 'fileType': false });
      }
      // IF FILE IS VALID THEN PROCESS
      if (erroFileSize === false && erroFiletype === false) {
        // GET FileReader INSTANCE
        const reader = new FileReader();
        // READ THE DATA FROM FILE SELECTED
        reader.readAsDataURL(event.target.files[0]);
        // OPEN CROPPING MODAL
        reader.onload = (events) => {
          this.openImgCropperDialogForSection3(events.target['result']);
          this.uploadImageInputSection3.nativeElement.value = '';
        };
      }
    }
  }

  /**
   * Open Common Image Cropper Component To Implement Croppping
   * @param Path provide path of the selected image
   */
  public openImgCropperDialogForSection2(path: any): void {
    const dialog = this.injector.get(MatDialog);
    const dialogRef = dialog.open(ImgCropperModalComponent, {
      // width: '550px',
      data: {
        file: path,
        centerTouchRadius: 100,
        canvasWidth: 650,
        canvasHeight: 300,
        cropperMinWidth: 555,
        cropperMinHeight: 180,
        croppedOutputWidth: 555,
        croppedOutputHeight: 180,
        noFileInput: true,
        rounded: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.section2ImageData.imageUrl = result.image;
      this.section2ImageData.image = result.file;
      // this.formContent.IMAGE_SECTION2 = result.file;
      this.croppedImageHeightForSection2 = result.croppedImageHeight;
      this.croppedImageWidthForSection2 = result.croppedImageWidth;
    });
  }

  /**
   * Open Common Image Cropper Component To Implement Croppping
   * @param Path provide path of the selected image
   */
  public openImgCropperDialogForSection3(path: any): void {
    const dialog = this.injector.get(MatDialog);
    const dialogRef = dialog.open(ImgCropperModalComponent, {
      // width: '550px',
      data: {
        file: path,
        centerTouchRadius: 100,
        canvasWidth: 650,
        canvasHeight: 400,
        cropperMinWidth: 555,
        cropperMinHeight: 310,
        croppedOutputWidth: 555,
        croppedOutputHeight: 310,
        noFileInput: true,
        rounded: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.section3ImageData.imageUrl = result.image;
      this.section3ImageData.image = result.file;
      // this.formContent.IMAGE_SECTION3 = result.file;
      this.croppedImageHeightForSection3 = result.croppedImageHeight;
      this.croppedImageWidthForSection3 = result.croppedImageWidth;
    });
  }

  public getHomeContent() {

    // Inject service
    const homeContentService = this.injector.get(HomeContentService);
    const progress = this.injector.get(NgProgress);

    // Call API
    homeContentService.getHomeContent().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data'] && response['data']['content']) {
          console.log(response);
          this.formContent = response['data']['content'];
          this.section2ImageData.imageUrl = `${environment.origin}/upload/home/${response['data']['content']['SECTION2_IMAGE']}`;
          this.section3ImageData.imageUrl = `${environment.origin}/upload/home/${response['data']['content']['SECTION3_IMAGE']}`;
        }
        progress.complete();
        this.isLoading = false;
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = false;
      }
    );
  }

  /**
   * Remove Section-2 Image
   */
  public removeSecion2Image() {
    // Inject service
    if (this.view === 'edit' && !this.section2ImageData.image && this.section2ImageData.imageUrl) {
      this.isLoading = true;
      const progress = this.injector.get(NgProgress);
      const activateRouter = this.injector.get(ActivatedRoute);
      const params = {
        'id': Number(activateRouter.snapshot.paramMap.get('id')),
      };
      const toaster = this.injector.get(ToastrService);
      const homeContentService = this.injector.get(HomeContentService);
      homeContentService.removeHomeContent(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            this.section2ImageData.imageUrl = null;
            this.uploadImageInputSection2.nativeElement.value = '';
            toaster.success('Image Removed successfully', 'SUCCESS');
          }
          progress.complete();
          this.isLoading = false;
        },
        (error: HttpResponse<any>) => {
          console.error(error);
          progress.complete();
          this.isLoading = false;
        }
      );
    } else {
      this.section2ImageData.imageUrl = null;
      this.uploadImageInputSection2.nativeElement.value = '';
    }

  }

  /**
   * Remove Section-3 Image
   */
  public removeSecion3Image() {
    // Inject service
    if (this.view === 'edit' && !this.section3ImageData.image && this.section3ImageData.imageUrl) {
      this.isLoading = true;
      const progress = this.injector.get(NgProgress);
      const activateRouter = this.injector.get(ActivatedRoute);
      const params = {
        'id': Number(activateRouter.snapshot.paramMap.get('id')),
      };
      const toaster = this.injector.get(ToastrService);
      const homeContentService = this.injector.get(HomeContentService);
      homeContentService.removeHomeContent(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            this.section3ImageData.imageUrl = null;
            this.uploadImageInputSection3.nativeElement.value = '';
            toaster.success('Image Removed successfully', 'SUCCESS');
          }
          progress.complete();
          this.isLoading = false;
        },
        (error: HttpResponse<any>) => {
          console.error(error);
          progress.complete();
          this.isLoading = false;
        }
      );
    } else {
      this.section3ImageData.imageUrl = null;
      this.uploadImageInputSection3.nativeElement.value = '';
    }

  }

  public updateContent() {
    // Inject service
    const homeContentService = this.injector.get(HomeContentService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    this.formContent.SECTION2_IMAGE = this.imageNameSection2;
    this.formContent.SECTION3_IMAGE = this.imageNameSection3;
    const formData: any = new FormData();
    formData.append('slug', 'HomeContent');
    formData.append('image', new File([this.section2ImageData.image], this.formContent.SECTION2_IMAGE));
    formData.append('image', new File([this.section3ImageData.image], this.formContent.SECTION3_IMAGE));
    delete this.formContent.IMAGE_SECTION2;
    delete this.formContent.IMAGE_SECTION3;
    formData.append('content', JSON.stringify(this.formContent));
    // Call API
    progress.start();
    this.isLoading = true;
    homeContentService.updateHomeContent(formData).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Show success toast message
          toastrService.success('Content Updated Successfully' , 'SUCCESS');
        }
        progress.complete();
        this.isLoading = false;
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = false;
      }
    );
  }
}
