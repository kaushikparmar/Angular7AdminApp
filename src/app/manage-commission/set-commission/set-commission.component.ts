import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { SetCommissionService } from './set-commission.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'pb-set-commission',
  templateUrl: './set-commission.component.html',
  styleUrls: ['./set-commission.component.scss']
})
export class SetCommissionComponent implements OnInit {

  @ViewChild('textarea') public textarea: ElementRef;
  public urlInfo: any = {};
  public blogData: any = [];
  public categoryList: any = [];
  public is_published: boolean = false;
  public isImageFileUpload: boolean = true;
  public isLoading: Boolean = false;
  public setCommission:any = [];
  public commissionFees:any;
  public is_fixed:any;
  public fees:any;
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
    this.getData();
  }

  resizeFunction() {
    const textarea = this.textarea.nativeElement;
    // Reset textarea height to auto that correctly calculate the new height
    textarea.style.height = 'auto';
    // Set new height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  /** Get specific blog data in edit blog page */
  public getData() {
    const params = {};
    this.isLoading = true;
    params['id'] = this.urlInfo.currentId;
    const setCommissionService = this.injector.get(SetCommissionService);
    setCommissionService.getUsers().subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          this.blogData = response['data'];
          this.setCommission = response['data']['commission']
          this.fees = this.setCommission[0].fees;
          this.is_fixed = this.setCommission[0].is_fixed;
          if(this.is_fixed == 1){
            this.is_fixed = "true";
          }else{
            this.is_fixed = "false"
          }
        }
      },
      (error: HttpResponse<any>) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  public makeFormDataParam(formData) {
    for (const key in this.blogData) {
      if ((this.blogData[key] !== undefined && this.blogData[key] !== null) && key !== 'created_at' && key !== 'updated_at') {
        formData.append(key, this.blogData[key]);
      }
    }
  }

  public updateCommission(form) {
    if (form['valid'] === true) {
      // const formData: FormData = new FormData();
      // this.makeFormDataParam(formData);
      const params = {};
      params['id'] = 1;
      // params['is_fixed'] = this.is_fixed.replace(/"/g, "");
      params['is_fixed'] = (this.is_fixed ==  "true") ? true:false;
      params['fees'] = +this.fees;
      const toastrService = this.injector.get(ToastrService);
      const setCommissionService = this.injector.get(SetCommissionService);
      setCommissionService.updateCommission(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            toastrService.success('Commission updated successfully', 'SUCCESS');
            const router = this.injector.get(Router);
            router.navigate(['/manage-commission']);
          }
        },
        (error: HttpResponse<any>) => {
          console.error(error);
        }
      );
    }
  }

  public onCloseImage() {
    this.blogData['file'] = undefined;
    this.isImageFileUpload = false;
  }

}
