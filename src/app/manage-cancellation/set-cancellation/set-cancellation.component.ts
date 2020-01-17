import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { SetCancellationService } from './set-cancellation.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'pb-set-cancellation',
  templateUrl: './set-cancellation.component.html',
  styleUrls: ['./set-cancellation.component.scss']
})
export class SetCancellationComponent implements OnInit {
  @ViewChild('textarea') public textarea: ElementRef;
  public urlInfo: any = {};
  public blogData: any = [];
  public categoryList: any = [];
  public is_published: boolean = false;
  public isImageFileUpload: boolean = true;
  public isLoading: Boolean = false;
  public setCancellation:any = [];
  public commissionFees:any;
  public is_hour:any;
  public time:any;
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
    const setCancellationService = this.injector.get(SetCancellationService);
    setCancellationService.getUsers().subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          // this.blogData = response['data'];
          this.setCancellation = response['data']['cancellationTime']
          this.time = this.setCancellation[0].time;
          this.is_hour = this.setCancellation[0].is_hour;
          if(this.is_hour == 1){
            this.is_hour = "true";
          }else{
            this.is_hour = "false"
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
      // params['is_hour'] = (this.is_hour ==  "true") ? true:false;
      params['time'] = +this.time;
      const toastrService = this.injector.get(ToastrService);
      const setCancellationService = this.injector.get(SetCancellationService);
      setCancellationService.updateCommission(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            toastrService.success('Commission updated successfully', 'SUCCESS');
            const router = this.injector.get(Router);
            router.navigate(['/manage-cancellation']);
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
