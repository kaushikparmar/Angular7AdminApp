import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomAdsListComponent } from './custom-ads-list/custom-ads-list.component';
import { CustomAdsDetailsComponent } from './custom-ads-details/custom-ads-details.component';

const routes: Routes = [
  {
    path: 'custom-ads',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        data: { title: 'custom-ads-list' },
        component: CustomAdsListComponent
      },
      {
        path: 'edit/:id',
        component: CustomAdsDetailsComponent,
        data: { title: 'edit-custom-ads' }
      },
      {
        path: 'view/:id',
        component: CustomAdsDetailsComponent,
        data: { title: 'view-custom-ads' }
      },
      {
        path: 'add',
        component: CustomAdsDetailsComponent,
        data: { title: 'add-custom-ads' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomAdsRoutingModule { }
