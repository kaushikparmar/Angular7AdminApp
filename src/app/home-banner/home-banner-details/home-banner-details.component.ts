import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { HomeBannerDetailService } from './home-banner-details.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { HomeBannerListService } from '../home-banner-list/home-banner-list.service';
import { ImgCropperModalComponent } from 'src/common/components/img-cropper-modal/img-cropper-modal.component';

@Component({
  selector: 'pb-home-banner-details',
  templateUrl: './home-banner-details.component.html',
  styleUrls: ['./home-banner-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeBannerDetailsComponent implements OnInit {

  @ViewChild('uploadImageInput') public uploadImageInput;

  public imageEvent: any = '';
  public isSubmited: boolean = false;
  public path: any;
  public homeBannerData: any = {};
  public isLoading: boolean;
  constructor(
    private injector: Injector,
    private activatedRoutes: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {

    const activateRouter = this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

    this.path = this.activatedRoutes.url['value'][0]['path'];

    if (this.path === 'view' || this.path === 'edit') {
      this.homeBannerDetails(id);
    }
  }

  /**
   * Id Based Home Banner Detail For Update & View
   */
  public homeBannerDetails(id) {
    // Inject service
    this.isLoading = true;
    const homeBannerListservice = this.injector.get(HomeBannerListService);
    const progress = this.injector.get(NgProgress);
    const params = {
      id: id
    };
    // Call API
    progress.start();
    homeBannerListservice.getHomeBanner(false, id).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0) {
          if (response['data']['response'][0]['banner']) {
            this.homeBannerData.imageUrl = `${environment.origin}/upload/${response['data']['response'][0]['banner']}`;
          }
          this.homeBannerData.title = response['data']['response'][0]['title'];
        } else {
            const router = this.injector.get(Router);
            router.navigate(['home-banner/list']);
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
 *
 * @param validStatus Form Valid State
 * Add/ Update Home Banner
 */
  public crudHomeBanner(validStatus) {
    this.isSubmited = true;
    if (validStatus === true && this.homeBannerData.imageUrl) {
      const homeBannerDetailService = this.injector.get(HomeBannerDetailService);
      const toaster = this.injector.get(ToastrService);
      const progress = this.injector.get(NgProgress);
      const formData: any = new FormData();
      // Call API
      progress.start();
      this.isLoading = true;
      formData.append('title', this.homeBannerData.title);
      if (this.homeBannerData.image) {
        formData.append('banner', this.homeBannerData.image);
      }
      if (this.path === 'add') {
        homeBannerDetailService.addHomeBanner(formData).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              const router = this.injector.get(Router);
              toaster.success('Home banner added successfully', 'SUCCESS');
              router.navigate(['/home-banner/list']);
            }
            progress.complete();
            this.isLoading = false;

          },
          (error: HttpResponse<any>) => {
            console.error(error);
            this.isLoading = false;
            progress.complete();
          }
        );
      } else {
        const activateRouter = this.injector.get(ActivatedRoute);
        formData.append('id', Number(activateRouter.snapshot.paramMap.get('id')));
        homeBannerDetailService.updateHomeBanner(formData).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              toaster.success('Home banner updated successfully', 'SUCCESS');
              const router = this.injector.get(Router);
              router.navigate(['/home-banner/list']);
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


  }


  /**
     * @param event File Event
     * File Upload Validation &  Image Instance  Assigining
     */
  public fileUploads(event) {
    // let erroFileSize: boolean = false;
    // let erroFileName: boolean = false;
    // if (event.target.files && event.target.files[0]) {
    //   if (event.target.files[0]['size'] > 2097152) {
    //     erroFileSize = true;
    //   }
    //   if (event.target.files[0]['type'] !== 'image/png' && event.target.files[0]['type'] !== 'image/jpeg' && event.target.files[0]['type'] !== 'image/jpg') {
    //     erroFileName = true;
    //   }

    //   if (erroFileSize === false && erroFileName === false) {
    //     if (event.target.files && event.target.files[0]) {
    //       // this.imageEvent = event;
    //       // this.openDialog();
    //       const reader = new FileReader();
    //       reader.readAsDataURL(event.target.files[0]);
    //       reader.onload = (events) => {
    //         this.homeBannerData.imageUrl = events.target['result'];
    //         this.homeBannerData.image = event.target.files[0];
    //         this.uploadImageInput.nativeElement.value = '';
    //       };

    //     } else {
    //       this.uploadImageInput.nativeElement.value = '';
    //     }
    //   } else {
    //     if (erroFileSize === true) {
    //       alert('Please select image max 2mb');
    //       this.uploadImageInput.nativeElement.value = '';
    //     }
    //     if (erroFileName === true) {
    //       alert('Please select only png format');
    //       this.uploadImageInput.nativeElement.value = '';

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
        canvasWidth: 700,
        canvasHeight: 500,
        cropperMinWidth : 260,
        cropperMinHeight : 230,
        croppedOutputWidth : 260,
        croppedOutputHeight : 230,
        noFileInput: true,
        rounded: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.homeBannerData.imageUrl = result.image;
      this.homeBannerData.image = result.file;
    });
  }


}
