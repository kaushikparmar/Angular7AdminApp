import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedListComponent } from './breed-list/breed-list.component';
import { BreedDetailComponent } from './breed-detail/breed-detail.component';

const routes: Routes = [
      {
        path: 'breed',
        data: { breadcrumb: 'Breed' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            data: { breadcrumb: 'Breed Listing' },
            component: BreedListComponent
          },
          {
            path: 'edit/:id',
            data: { breadcrumb: 'edit Breed Detail' },
            component: BreedDetailComponent,
          },
          {
            path: 'add',
            data: { breadcrumb: 'add Breed Detail' },
            component: BreedDetailComponent,
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedRoutingModule { }
