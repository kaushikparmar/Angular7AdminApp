import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { FaqDetailService } from './faq-details.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
// import { ImageCropperModalComponent } from 'src/common/components/image-cropper-modal/image-cropper-modal.component';
import { ImgCropperModalComponent } from 'src/common/components/img-cropper-modal/img-cropper-modal.component';

@Component({
  selector: 'pb-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqDetailsComponent implements OnInit {

  @ViewChild('uploadImageInput') public uploadImageInput;
  public fetchTopicsData: any = [];
  public imageEvent: any = '';

  public fetchSubTopicsData: any = [];
  public isSubmited: boolean = false;
  public faqData: any = [];
  public path: any;
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
      this.faqDetails(id);
    }
    this.fetchTopics();
  }


  public faqDetails(id) {
    // Inject service
    this.isLoading = true;
    const faqListservice = this.injector.get(FaqDetailService);
    const progress = this.injector.get(NgProgress);
    const params = {
      id: id
    };
    // Call API
    progress.start();
    faqListservice.fetchFaqDetail(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0) {
          this.faqData.topics = response['data']['topic_id'];
          this.faqData.subtopics = response['data']['sub_topic_id'];
          if (this.faqData.topics) {
            this.fetchSubTopics();
          }
          this.faqData.question = response['data']['question'];
          if (response['data']['answer']) {
            this.faqData.answer = response['data']['answer'];
          }
          if (response['data']['image'] && response['data']['image'] !== null) {
            this.faqData.imageUrl = `${environment.origin}/upload/${response['data']['image']}`;
          }
        } else {
          const router = this.injector.get(Router);
          router.navigate(['faq/list']);
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
  //       this.faqData.image = value.file;
  //       this.faqData.imageUrl = value['base64'];
  //       this.uploadImageInput.nativeElement.value = '';
  //     } else {
  //       this.uploadImageInput.nativeElement.value = '';
  //     }
  //   });
  // }

  /**
   * Fetch parent Topics
   */
  public fetchTopics() {

    this.isLoading = true;

    // Inject service
    const faqListservice = this.injector.get(FaqDetailService);
    const progress = this.injector.get(NgProgress);
    this.fetchTopicsData = [];
    // Call API
    progress.start();
    faqListservice.fetchParentTopics().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.fetchTopicsData = response['data'];
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
  }

  public crudFaq(validStatus) {
    this.isSubmited = true;
    if (validStatus === true) {
      const faqListservice = this.injector.get(FaqDetailService);
      const toaster = this.injector.get(ToastrService);
      const progress = this.injector.get(NgProgress);
      const formData: any = new FormData();
      formData.append('topic_id', this.faqData.topics);
      formData.append('sub_topic_id', this.faqData.subtopics);
      formData.append('question', this.faqData.question);
      if (this.faqData.answer) {
        formData.append('answer', this.faqData.answer);
      }
      if (this.faqData.image) {
        formData.append('image', this.faqData.image);
      }
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.path === 'add') {
        faqListservice.addFaq(formData).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              const router = this.injector.get(Router);
              toaster.success('FAQ added successfully', 'SUCCESS');
              router.navigate(['/faq/list']);
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
              toaster.success('FAQ updated successfully', 'SUCCESS');
              const router = this.injector.get(Router);
              router.navigate(['/faq/list']);
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
   * Fetch Sub Topics
   */
  public fetchSubTopics() {

    // Inject service
    this.isLoading = true;

    const faqListservice = this.injector.get(FaqDetailService);
    this.fetchSubTopicsData = [];
    const progress = this.injector.get(NgProgress);
    const params = {
      'id': this.faqData.topics
    };
    // Call API
    progress.start();
    faqListservice.fetchSubTopics(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.fetchSubTopicsData = response['data'];
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

  }

  /**
     * Upload Files
     * @param event Files To Upload
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
    //       this.imageEvent = event;
    //       this.openDialog();
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
      if (event.target.files[0]['type'] !== 'image/png' &&
        event.target.files[0]['type'] !== 'image/jpeg' &&
        event.target.files[0]['type'] !== 'image/jpg') {
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
    if (this.path === 'edit' && !this.faqData.image && this.faqData.imageUrl) {
      this.isLoading = true;
      const progress = this.injector.get(NgProgress);
      const activateRouter = this.injector.get(ActivatedRoute);
      const params = {
        'id': Number(activateRouter.snapshot.paramMap.get('id')),
        'type': 'faq_image',
        'image': this.faqData.imageUrl
      };
      const toaster = this.injector.get(ToastrService);
      const faqListservice = this.injector.get(FaqDetailService);
      faqListservice.deleteFaq(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            this.faqData.imageUrl = null;
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
      this.faqData.imageUrl = null;
      this.uploadImageInput.nativeElement.value = '';
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
      // this.blogData.fileUrl = result.image;
      // this.blogData.file = result.file;
        this.faqData.image = result.file;
        this.faqData.imageUrl = result.image;
    });
  }
}
