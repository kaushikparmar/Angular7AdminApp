import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/common/modules/shared.module';
import { MyPetsRoutingModule } from './my-pets-routing.module';
import { PetsListingComponent } from './pets-listing/pets-listing.component';
import { PetsDetailsComponent } from './pets-details/pets-details.component';

@NgModule({
  declarations: [PetsListingComponent, PetsDetailsComponent],
  imports: [
    CommonModule,
    MyPetsRoutingModule,
    SharedModule
  ]
})
export class MyPetsModule { }
