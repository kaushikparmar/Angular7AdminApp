import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { EmailTemplateDetailService } from './email-template-details.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
// import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
// import { ImageCropperModalComponent } from 'src/common/components/image-cropper-modal/image-cropper-modal.component';


@Component({
  selector: 'pb-email-template-details',
  templateUrl: './email-template-details.component.html',
  styleUrls: ['./email-template-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmailTemplateDetailsComponent implements OnInit {

  // @ViewChild('uploadImageInput') public uploadImageInput;
  public fetchTopicsData: any = [];
  public imageEvent: any = '';
  public isDescriptionInvalid: boolean = false;
  public fetchSubTopicsData: any = [];
  public isSubmited: boolean = false;
  public emailTemplateData: any = [];
  public path: any;
  public isLoading: boolean;
  constructor(
    private injector: Injector,
    private activatedRoutes: ActivatedRoute,
    // private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    const activateRouter = this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

    this.path = this.activatedRoutes.url['value'][0]['path'];

    if (this.path === 'view' || this.path === 'edit') {
      this.emailTemplateDetails(id);
    }
  }

  public validateDescription() {
    if (!this.emailTemplateData.email) {
      this.isDescriptionInvalid = true;
    }
    if (this.emailTemplateData.email) {
      const content = this.emailTemplateData.email.replace(/<\/?[^>]+(>|$)/g, '').split('');
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

  public emailTemplateDetails(id) {
    // Inject service
    this.isLoading = true;
    const emailTemplateListservice = this.injector.get(EmailTemplateDetailService);
    const progress = this.injector.get(NgProgress);
    const params = {
      id: id
    };
    // Call API
    progress.start();
    emailTemplateListservice.fetchEmailTemplateDetail(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0) {
          this.emailTemplateData = response['data']['result'][0];
        } else {
          const router = this.injector.get(Router);
          router.navigate(['email-template/list']);
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
   * @param validStatus Indentify form valid
   * Perform Add & Update Email Template
   */
  public crudEmailTemplate(validStatus) {
    this.isSubmited = true;
    this.validateDescription();
    if (validStatus === true && !this.isDescriptionInvalid) {
      const emailtemplateDataListservice = this.injector.get(EmailTemplateDetailService);
      const toaster = this.injector.get(ToastrService);
      const progress = this.injector.get(NgProgress);
      const params: any = {
        'email_key' : this.emailTemplateData['email_key'],
        'subject' : this.emailTemplateData['subject'],
        'email' : this.emailTemplateData['email']
      };


      // Call API
      progress.start();
      this.isLoading = true;
      if (this.path === 'add') {
        emailtemplateDataListservice.addEmailTemplate(params).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              const router = this.injector.get(Router);
              toaster.success('Email template added successfully', 'SUCCESS');
              router.navigate(['/email-template/list']);
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


        params['id'] = Number(activateRouter.snapshot.paramMap.get('id'));

        emailtemplateDataListservice.updateEmailTemplate(params).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              toaster.success('Email template updated successfully', 'SUCCESS');
              const router = this.injector.get(Router);
              router.navigate(['/email-template/list']);
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

}
