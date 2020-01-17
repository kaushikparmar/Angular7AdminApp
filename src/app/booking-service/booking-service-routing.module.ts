import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingServiceListComponent } from './booking-service-list/booking-service-list.component'
import { BookingServiceDetailsComponent } from './booking-service-details/booking-service-details.component'

const routes: Routes = [
  {
    path: 'booking-service',
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: BookingServiceListComponent,
        data: { title: 'bookingservicelist' }
      },
      {
        path: 'details/:id',
        component: BookingServiceDetailsComponent,
        data: { title: 'bookingservicedetails' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingServiceRoutingModule { }
