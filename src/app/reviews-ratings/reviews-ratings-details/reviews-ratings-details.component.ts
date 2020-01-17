import { Component, OnInit, Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgProgress } from '@ngx-progressbar/core';
import { ReviewsRatingsDetailsService } from './reviews-ratings-details.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pb-reviews-ratings-details',
  templateUrl: './reviews-ratings-details.component.html',
  styleUrls: ['./reviews-ratings-details.component.scss']
})
export class ReviewsRatingsDetailsComponent implements OnInit {
  public isLoading: Boolean = false;
  public reviewsDetails: any = [];
  public urlInfo: any = {};

  constructor(private injector: Injector, private router: Router, private activatedRoute: ActivatedRoute) {
    this.urlInfo.currentState = this.activatedRoute.url['value'][0].path;
    if (this.activatedRoute.url['value'][1]) {
      this.urlInfo.currentId = parseInt(this.activatedRoute.url['value'][1].path, 10);
    }
  }

  ngOnInit() {
    this.getReviewDetails();
  }

  public getReviewDetails() {
    this.isLoading = true;
    const progress = this.injector.get(NgProgress);
    const params = {};
    params['id'] = this.urlInfo.currentId;
    const reviewsRatingsDetailsService = this.injector.get(ReviewsRatingsDetailsService);
    reviewsRatingsDetailsService.getReviewDetails(params).subscribe(
      (response: HttpResponse<any>) => {
        progress.complete();
        this.isLoading = false;
        if (response['code'] === 200) {
          this.reviewsDetails = response['data']['result'][0];
          this.reviewsDetails.created_on = this.parseDate(new Date(this.reviewsDetails.created_on));
          this.reviewsDetails.updated_on = this.parseDate(new Date(this.reviewsDetails.updated_on));
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = false;
      }
    );
  }

  parseDate(date) {
    const dd = (date.getDate().toString().length === 1) ? '0' + date.getDate() : date.getDate();
    let mm = date.getMonth() + 1;
    mm = (mm.toString().length === 1) ? '0' + mm : mm;
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }
}
