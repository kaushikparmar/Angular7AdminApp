import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InappropriateRoutingModule } from './inappropriate-routing.module';
import { InappropriateListComponent } from './inappropriate-list/inappropriate-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { InappropriateListService } from './inappropriate-list/inappropriate-list.service';
import { InappropriateDetailsComponent } from './inappropriate-details/inappropriate-details.component';
import { InappropriateDetailsServiceService } from './inappropriate-details/inappropriate-details-service.service';

@NgModule({
  declarations: [InappropriateListComponent, InappropriateDetailsComponent],
  imports: [
    CommonModule,
    InappropriateRoutingModule,
    SharedModule
  ],
  providers: [
    InappropriateListService,
    InappropriateDetailsServiceService
  ]
})
export class InappropriateModule { }
