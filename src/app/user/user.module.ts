import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { UserListService } from './user-list/user-list.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { RatesComponent } from './rates/rates.component';
import { AvailabilityComponent } from './availability/availability.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserProfileComponent,
    FavoriteListComponent,
    ServiceDetailComponent,
    RatesComponent,
    AvailabilityComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [
    UserListService
  ]
})
export class UserModule { }
