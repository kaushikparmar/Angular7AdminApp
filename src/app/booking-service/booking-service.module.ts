import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingServiceListService } from './booking-service-list/booking-service-list.service';
import { SharedModule } from 'src/common/modules/shared.module';
import { BookingServiceRoutingModule } from './booking-service-routing.module';
import { BookingServiceListComponent } from './booking-service-list/booking-service-list.component';
import { BookingServiceDetailsComponent } from './booking-service-details/booking-service-details.component';

@NgModule({
  declarations: [BookingServiceListComponent, BookingServiceDetailsComponent],
  imports: [
    CommonModule,
    BookingServiceRoutingModule,
    SharedModule
  ],
  providers: [
    BookingServiceListService
  ]
})
export class BookingServiceModule { }
