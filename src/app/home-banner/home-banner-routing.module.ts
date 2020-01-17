import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeBannerListComponent } from './home-banner-list/home-banner-list.component';
import { HomeBannerDetailsComponent } from './home-banner-details/home-banner-details.component';

const routes: Routes = [
  {
    path: 'home-banner',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        data: { title: 'home-banner-list' },
        component: HomeBannerListComponent
      },
      {
        path: 'edit/:id',
        component: HomeBannerDetailsComponent,
        data: { title: 'edit-home-banner' }
      },
      {
        path: 'view/:id',
        component: HomeBannerDetailsComponent,
        data: { title: 'view-home-banner' }
      },
      {
        path: 'add',
        component: HomeBannerDetailsComponent,
        data: { title: 'add-home-banner' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeBannerRoutingModule { }
