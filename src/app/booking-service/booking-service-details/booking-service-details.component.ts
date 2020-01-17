import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation , Injector} from '@angular/core';
import { BookingServiceDetailsService } from '../booking-service-details/booking-service-details.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'pb-booking-service-details',
  templateUrl: './booking-service-details.component.html',
  styleUrls: ['./booking-service-details.component.scss']
})
export class BookingServiceDetailsComponent implements OnInit {

  @ViewChild('textarea') public textarea: ElementRef;
  public urlInfo: any = {};
  public detailsData: any = [];
  public originUrl: any = '';
  public categoryList: any = [];
  public is_published: boolean = false;
  public isImageFileUpload: boolean = true;
  public isLoading:Boolean = false;
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
      this.ViewDetails();
      this.originUrl = environment.origin;
    }
  }

  

  /** Get specific blog data in edit blog page */
  public ViewDetails() {
    const params = {};
    params['id'] = this.urlInfo.currentId;
    const bookingServiceDetailsService = this.injector.get(BookingServiceDetailsService);
    bookingServiceDetailsService.ViewDetails(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          
          this.detailsData = response['data']['result'];
          console.log(this.detailsData);
          this.isLoading = false;
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        this.isLoading = true;
      }
    );
  }

}
