import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqDetailsComponent } from './faq-details/faq-details.component';

const routes: Routes = [
  {
    path: 'faq',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        data: { title: 'faq-list' },
        component: FaqListComponent
      },
      {
        path: 'edit/:id',
        component: FaqDetailsComponent,
        data: { title: 'edit-faq' }
      },
      {
        path: 'view/:id',
        component: FaqDetailsComponent,
        data: { title: 'view-faq' }
      },
      {
        path: 'add',
        component: FaqDetailsComponent,
        data: { title: 'add-faq' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
