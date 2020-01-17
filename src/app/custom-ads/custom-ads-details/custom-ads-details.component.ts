import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { CustomAdsDetailService } from './custom-ads-details.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
// import { ImageCropperModalComponent } from 'src/common/components/image-cropper-modal/image-cropper-modal.component';
import { ImgCropperModalComponent } from 'src/common/components/img-cropper-modal/img-cropper-modal.component';

@Component({
  selector: 'pb-custom-ads-details',
  templateUrl: './custom-ads-details.component.html',
  styleUrls: ['./custom-ads-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomAdsDetailsComponent implements OnInit {

  @ViewChild('uploadImageInput') public uploadImageInput;
  public fetchSectionData: any = [{
    'name': 'blog',
    'type': 'Blog',
    'cropDimensions': {
      'height': 270,
      'width': 350
    }
  },
  {
    'name': 'press',
    'type': 'Press',
    'cropDimensions': {
      'height': 270,
      'width': 350
    }
  },
  {
    'name': 'search',
    'type': 'Search',
    'cropDimensions': {
      'height': 270,
      'width': 350
    }
  },
  {
    'name': 'social_media',
    'type': 'Social Media',
    'cropDimensions': {
      'height': 500,
      'width': 260
    }
  }
  ];
  public imageEvent: any = '';
  public todayDate: Date;
  public fetchSubTopicsData: any = [];
  public isSubmited: boolean = false;
  public customAdsData: any = [];
  public path: any;
  public isLoading: boolean;
  public cron_note: any;
  constructor(
    private injector: Injector,
    private activatedRoutes: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  /**
   * Open Common Image Cropper Component To Implement Croppping
   * @param Path provide path of the selected image
   */
  public openImgCropperDialog(path: any): void {

    const selectedSection = this.fetchSectionData.filter((obj) => obj['name'] === this.customAdsData.section)[0];
    if (selectedSection) {
      const dialogRef = this.dialog.open(ImgCropperModalComponent, {
        // width: '550px',
        data: {
          file: path,
          centerTouchRadius: 100,
          canvasWidth: 600,
          canvasHeight: 700,
          cropperMinWidth: selectedSection['cropDimensions']['height'],
          cropperMinHeight: selectedSection['cropDimensions']['width'],
          croppedOutputWidth: selectedSection['cropDimensions']['height'],
          croppedOutputHeight: selectedSection['cropDimensions']['width'],
          noFileInput: true,
          rounded: false
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.customAdsData.imageUrl = result.image;
        this.customAdsData.image = result.file;
      });
    }

  }

  ngOnInit() {


    this.todayDate = new Date();

    const activateRouter = this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

    this.path = this.activatedRoutes.url['value'][0]['path'];

    if (this.path === 'view' || this.path === 'edit') {
      this.customAdsDetails(id);
    }
  }


  public customAdsDetails(id) {
    // Inject service
    this.isLoading = true;
    const customAdsListservice = this.injector.get(CustomAdsDetailService);
    const progress = this.injector.get(NgProgress);
    const params = {
      id: id
    };
    // Call API
    progress.start();
    customAdsListservice.fetchcustomAdsDetail(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0) {
          if (response['data']['result'][0]['banner']) {
            this.customAdsData.imageUrl = `${environment.origin}/upload/${response['data']['result'][0]['banner']}`;
          }
          this.customAdsData.section = response['data']['result'][0]['section'];
          this.customAdsData.link = response['data']['result'][0]['link'];
          this.customAdsData.fromdate = response['data']['result'][0]['from_date'];
          this.customAdsData.todate = response['data']['result'][0]['to_date'];
          this.customAdsData.notes = response['data']['result'][0]['note'];
          this.customAdsData.sequence = response['data']['result'][0]['sequence'];
          this.cron_note = response['data']['result'][0]['cron_note'];
        } else {
          const router = this.injector.get(Router);
          router.navigate(['custom-ads/list']);
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
  // public openDialog() {
  //   const dialogConfig = new MatDialogConfig();
  //   const dialogRef = this.dialog.open(ImageCropperModalComponent, { data: this.imageEvent, width: '600px' });
  //   dialogRef.afterClosed().subscribe(value => {
  //     if (value) {
  //       this.customAdsData.image = value.file;
  //       this.customAdsData.imageUrl = value['base64'];
  //       this.uploadImageInput.nativeElement.value = '';
  //     } else {
  //       this.uploadImageInput.nativeElement.value = '';
  //     }
  //   });
  // }

  public setMinimumToDate(date) {
    if (date) {
      return this.customAdsData['fromdate'];
    } else {
      return this.todayDate;
    }
  }

  public crudCustomAds(validStatus) {
    this.isSubmited = true;
    if (validStatus === true && this.customAdsData.imageUrl) {
      const faqListservice = this.injector.get(CustomAdsDetailService);
      const toaster = this.injector.get(ToastrService);
      const progress = this.injector.get(NgProgress);
      const formData: any = new FormData();
      formData.append('section', this.customAdsData.section);
      formData.append('sequence', this.customAdsData.sequence);
      if (this.customAdsData.fromdate) {
        formData.append('from_date', this.customAdsData.fromdate);
      }

      if (this.customAdsData.todate) {
        formData.append('to_date', this.customAdsData.todate);
      }
      if (this.customAdsData.is_published === true) {
        formData.append('is_published', true);
      } else {
        formData.append('is_published', false);
      }
      if (this.customAdsData.notes) {
        formData.append('note', this.customAdsData.notes);
      }
      if (this.customAdsData.image) {
        formData.append('banner', this.customAdsData.image);
      }
      if (this.customAdsData.link) {
        const re = new RegExp('^(http|https)://', 'i');
        const str = this.customAdsData.link;
        const match = re.test(str);
        let urlSet: string = '';
        if (match === true) {
          urlSet = this.customAdsData.link;
        } else {
          urlSet = `http://${this.customAdsData.link}`;
        }

        formData.append('link', urlSet);
      }
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.path === 'add') {
        faqListservice.addFaq(formData).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              const router = this.injector.get(Router);
              toaster.success('Custom ads added successfully', 'SUCCESS');
              router.navigate(['/custom-ads/list']);
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
        faqListservice.updateFaq(formData).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              toaster.success('Custom ads updated successfully', 'SUCCESS');
              const router = this.injector.get(Router);
              router.navigate(['/custom-ads/list']);
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
     * Upload Files
     * @param event Files To Upload
     */
  public fileUploads(event) {
    let erroFileSize: boolean = false;
    let erroFileName: boolean = false;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0]['size'] > 2097152) {
        erroFileSize = true;
      }
      if (event.target.files[0]['type'] !== 'image/png' &&
        event.target.files[0]['type'] !== 'image/jpeg' && event.target.files[0]['type'] !== 'image/jpg') {
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

  public removeImage() {
    // Inject service
    if (this.path === 'edit' && !this.customAdsData.image && this.customAdsData.imageUrl) {
      this.isLoading = true;
      const progress = this.injector.get(NgProgress);
      const activateRouter = this.injector.get(ActivatedRoute);
      const params = {
        'id': Number(activateRouter.snapshot.paramMap.get('id')),
      };
      const toaster = this.injector.get(ToastrService);
      const faqListservice = this.injector.get(CustomAdsDetailService);
      faqListservice.deleteFaq(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            this.customAdsData.imageUrl = null;
            this.uploadImageInput.nativeElement.value = '';
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
      this.customAdsData.imageUrl = null;
      this.uploadImageInput.nativeElement.value = '';
    }

  }
}
