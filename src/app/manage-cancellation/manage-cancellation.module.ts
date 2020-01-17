import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/common/modules/shared.module';
import { ManageCancellationRoutingModule } from './manage-cancellation-routing.module';
import { ManageCancellationListComponent } from './manage-cancellation-list/manage-cancellation-list.component';
import { SetCancellationComponent } from './set-cancellation/set-cancellation.component';

@NgModule({
  declarations: [ManageCancellationListComponent, SetCancellationComponent],
  imports: [
    CommonModule,
    ManageCancellationRoutingModule,
    SharedModule
  ]
})
export class ManageCancellationModule { }
