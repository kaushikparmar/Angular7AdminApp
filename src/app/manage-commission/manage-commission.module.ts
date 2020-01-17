import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/common/modules/shared.module';

import { ManageCommissionRoutingModule } from './manage-commission-routing.module';
import { ManageCommissionListComponent } from './manage-commission-list/manage-commission-list.component';
import { SetCommissionComponent } from './set-commission/set-commission.component';

@NgModule({
  declarations: [ManageCommissionListComponent, SetCommissionComponent],
  imports: [
    CommonModule,
    ManageCommissionRoutingModule,
    SharedModule
  ]
})
export class ManageCommissionModule { }
