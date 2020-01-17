import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { PetsListingComponent } from './pets-listing/pets-listing.component';
 import { PetsDetailsComponent } from './pets-details/pets-details.component';
const routes: Routes = [
  {
    path: 'manage-pets',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        data: { title: 'pets-list' },
        component: PetsListingComponent
      },
      {
        path: 'view/:id',
        component: PetsDetailsComponent,
        data: { title: 'view-pet-details' }
      } ,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPetsRoutingModule { }
