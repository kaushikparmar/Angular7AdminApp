import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostFoundListService } from './lost-found-list/lost-found-list.service';
import { SharedModule } from 'src/common/modules/shared.module';

import { LostFoundRoutingModule } from './lost-found-routing.module';
import { LostFoundListComponent } from './lost-found-list/lost-found-list.component';
import { LostFoundDetailsComponent } from './lost-found-details/lost-found-details.component';

@NgModule({
  declarations: [
    LostFoundListComponent,
    LostFoundDetailsComponent
  ],
  imports: [
    CommonModule,
    LostFoundRoutingModule,
    SharedModule
  ],
  providers: [
    LostFoundListService
  ]
})
export class LostFoundModule { }
