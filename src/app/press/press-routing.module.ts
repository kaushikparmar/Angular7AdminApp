import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PressListComponent } from './press-list/press-list.component';
import { PressDetailsComponent } from './press-details/press-details.component';
import { PressCategoryListComponent } from './press-category-list/press-category-list.component';
import { PressCategoryDetailsComponent } from './press-category-details/press-category-details.component';


const routes: Routes = [
      {
        path: 'press',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'press-list'
          },
          {
            path: 'add-press',
            data: { title: 'add-press' },
            component: PressDetailsComponent
          },
          {
            path: 'edit-press/:id',
            data: { title: 'edit-press' },
            component: PressDetailsComponent
          },
          {
            path: 'view-press/:id',
            data: { title: 'view-press' },
            component: PressDetailsComponent
          },
          {
            path: 'press-list',
            data: { title: 'press-list' },
            component: PressListComponent
          },
        ]
      },
      {
        path: 'press-category',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'press-category-list'
          },
          {
            path: 'press-category-list',
            data: { title: 'press-category-list' },
            component: PressCategoryListComponent
          },
          {
            path: 'add-press-category',
            data: { title: 'add-press-category' },
            component: PressCategoryDetailsComponent
          },
          {
            path: 'edit-press-category/:id',
            data: { title: 'edit-press-category' },
            component: PressCategoryDetailsComponent
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressRoutingModule { }
