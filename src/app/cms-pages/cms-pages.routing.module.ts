import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsPagesListComponent } from './cms-pages-list/cms-pages-list.component';
import { CmsPagesDetailsComponent } from './cms-pages-details/cms-pages-details.component';
import { HomeContentComponent } from './home-content/home-content.component';

const routes: Routes = [
  {
    path: 'cms-pages',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        data: { title: 'custom-ads-list' },
        component: CmsPagesListComponent
      },
      {
        path: 'edit/:id',
        component: CmsPagesDetailsComponent,
        data: { title: 'edit-cms' }
      },
      {
        path: 'view/:id',
        component: CmsPagesDetailsComponent,
        data: { title: 'view-cms' }
      },
      {
        path: 'add',
        component: CmsPagesDetailsComponent,
        data: { title: 'add-cms' }
      },
      {
        path: 'home-content',
        component: HomeContentComponent,
        data: { title: 'Home Content Update' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsPagesRoutingModule { }
