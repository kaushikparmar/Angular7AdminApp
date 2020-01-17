import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCommissionListComponent } from './manage-commission-list/manage-commission-list.component';
import { SetCommissionComponent } from './set-commission/set-commission.component';
const routes: Routes = [
  {
    path: 'manage-commission',
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ManageCommissionListComponent,
        data: { title: 'manage-commission' }
      },
      {
        path: 'set-commission',
        component: SetCommissionComponent,
        data: { title: 'set-commission' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCommissionRoutingModule { }
