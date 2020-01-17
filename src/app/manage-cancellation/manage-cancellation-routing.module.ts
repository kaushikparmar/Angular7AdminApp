import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCancellationListComponent } from './manage-cancellation-list/manage-cancellation-list.component';
import { SetCancellationComponent } from './set-cancellation/set-cancellation.component'

const routes: Routes = [
  {
    path: 'manage-cancellation',
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ManageCancellationListComponent,
        data: { title: 'manage-cancellation' }
      },
      {
        path: 'set-cancellation',
        component: SetCancellationComponent,
        data: { title: 'set-cancellation' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCancellationRoutingModule { }
