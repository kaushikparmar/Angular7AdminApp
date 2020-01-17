import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LostFoundListComponent } from './lost-found-list/lost-found-list.component';
import { LostFoundDetailsComponent } from './lost-found-details/lost-found-details.component';

const routes: Routes = [
  {
    path: 'lost-and-found',
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: LostFoundListComponent,
        data: { title: 'lostfoundlist' }
      },
      {
        path: 'details/:id',
        component: LostFoundDetailsComponent,
        data: { title: 'lostfounddetails' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LostFoundRoutingModule { }
