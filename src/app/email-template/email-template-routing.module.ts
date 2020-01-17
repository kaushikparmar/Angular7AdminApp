import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { EmailTemplateDetailsComponent } from './email-template-details/email-template-details.component';

const routes: Routes = [
  {
    path: 'email-template',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        data: { title: 'email-template-list' },
        component: EmailTemplateListComponent
      },
      {
        path: 'edit/:id',
        component: EmailTemplateDetailsComponent,
        data: { title: 'edit-email-template' }
      },
      {
        path: 'view/:id',
        component: EmailTemplateDetailsComponent,
        data: { title: 'view-email-template' }
      },
      {
        path: 'add',
        component: EmailTemplateDetailsComponent,
        data: { title: 'add-email-template' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
