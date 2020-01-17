import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { ContactUsDetailComponent } from './contact-us-detail/contact-us-detail.component';

const routes: Routes = [
      {
        path: 'contact-us',
        data: { breadcrumb: 'Contact Us' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'contact-us-list'
          },
          {
            path: 'contact-us-list',
            data: { breadcrumb: 'Contact Us Listing' },
            component: ContactUsListComponent
          },
          {
            path: 'view/:id',
            data: { breadcrumb: 'View Contact Detail' },
            component: ContactUsDetailComponent,
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
