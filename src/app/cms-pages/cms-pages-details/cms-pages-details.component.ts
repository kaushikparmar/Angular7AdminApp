import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { CmsPagesDetailService } from './cms-pages-details.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import Quill from 'quill';
import Counter from '../../counter';


@Component({
  selector: 'pb-cms-pages-details',
  templateUrl: './cms-pages-details.component.html',
  styleUrls: ['./cms-pages-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CmsPagesDetailsComponent implements OnInit {

  @ViewChild('uploadImageInput') public uploadImageInput;
  public isSubmited: boolean = false;
  public isDescriptionInvalid: boolean = false;
  public cmsData: any = {
    'content' : '',
    'name' : ''
  };
  public path: any;
  public isLoading: boolean;
  constructor(
    private injector: Injector,
    private activatedRoutes: ActivatedRoute,
    private dialog: MatDialog
  ) {
    const Parchment = Quill.import('parchment');
    const Block = Parchment.query('block');
    Block.tagName = 'DIV';
        // or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
    Quill.register(Block /* or NewBlock */, true);
    Quill.register('modules/counter', Counter);
  }

  ngOnInit() {



    const activateRouter = this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

    this.path = this.activatedRoutes.url['value'][0]['path'];

    if (this.path === 'view' || this.path === 'edit') {
      this.getCmsPagesDetail(id);
    }
  }


/**
   * Get Faq List
   */
  public getCmsPagesDetail(id) {

    // Inject service
    const cmsPagesListService = this.injector.get(CmsPagesDetailService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    const params = {
      'id' : id
    };


    this.isLoading = true;
    cmsPagesListService.fetchCmsDetail(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Append Table Data
          if (Object.prototype.toString.call(response['data']['result']) === '[object Array]') {
            if (response['data']['totalRecords'] > 0 ) {
              this.cmsData = response['data']['result'][0];
            }
          }

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


public validateDescription() {
  if (!this.cmsData.content) {
    this.isDescriptionInvalid = true;
  }
  if (this.cmsData.content) {
    const content = this.cmsData.content.replace(/<\/?[^>]+(>|$)/g, '').split('');
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


  /**
   * Fetch parent Topics
   */

  public crudCms(validStatus) {
    this.isSubmited = true;
    this.validateDescription();
    if (validStatus === true && !this.isDescriptionInvalid  ) {
      const cmsListservice = this.injector.get(CmsPagesDetailService);
      const toaster = this.injector.get(ToastrService);
      const progress = this.injector.get(NgProgress);

      const params = {
        'name' : this.cmsData.name,
        'content' : this.cmsData.content
      };
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.path === 'add') {
        cmsListservice.addCms(params).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              const router = this.injector.get(Router);
              toaster.success('FAQ added successfully', 'SUCCESS');
              router.navigate(['/cms-pages/list']);
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
        params['id'] =  Number(activateRouter.snapshot.paramMap.get('id'));
        cmsListservice.updateCms(params).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              toaster.success('FAQ updated successfully', 'SUCCESS');
              const router = this.injector.get(Router);
              router.navigate(['/cms-pages/list']);
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
