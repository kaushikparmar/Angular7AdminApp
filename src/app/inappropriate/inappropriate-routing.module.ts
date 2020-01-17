import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InappropriateListComponent } from './inappropriate-list/inappropriate-list.component';
import { InappropriateDetailsComponent } from './inappropriate-details/inappropriate-details.component';

const routes: Routes = [
  {
    path: 'inappropriate',
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: InappropriateListComponent,
        data: { title: 'inappropriate' }
      },
      {
        path: 'details/:id',
        component: InappropriateDetailsComponent,
        data: { title: 'details' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InappropriateRoutingModule { }
