import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsRatingsListComponent } from './reviews-ratings-list/reviews-ratings-list.component';
import { ReviewsRatingsDetailsComponent } from './reviews-ratings-details/reviews-ratings-details.component';

const routes: Routes = [
  {
    path: 'reviews-ratings',
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reviews-ratings-list'
      },
      {
        path: 'reviews-ratings-list',
        data: { title: 'reviews-ratings-list' },
        component: ReviewsRatingsListComponent
      },
      {
        path: 'reviews-ratings-view/:id',
        data: { title: 'reviews-ratings-view' },
        component: ReviewsRatingsDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRatingsRoutingModule { }
