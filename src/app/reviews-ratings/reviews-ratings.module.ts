import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common/modules/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ReviewsRatingsRoutingModule } from './reviews-ratings-routing.module';
import { ReviewsRatingsListComponent } from './reviews-ratings-list/reviews-ratings-list.component';
import { ReviewsRatingsDetailsComponent } from './reviews-ratings-details/reviews-ratings-details.component';

@NgModule({
  declarations: [ReviewsRatingsListComponent, ReviewsRatingsDetailsComponent],
  imports: [
    NgbModule,
    CommonModule,
    SharedModule,
    ReviewsRatingsRoutingModule
  ]
})
export class ReviewsRatingsModule { }
