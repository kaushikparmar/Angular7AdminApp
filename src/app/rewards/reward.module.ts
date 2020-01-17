import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardRoutingModule } from './reward-routing.module';
import { RewardListComponent } from './reward-list/reward-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { RewardListService } from './reward-list/reward-list.service';
import { RewardDetailsComponent } from './reward-details/reward-details.component';
import { RewardDetailService } from './reward-details/reward-details.service';
import {RewardHistoryListService} from './reward-history-list/reward-history-list.service';
import { RewardHistoryListComponent } from './reward-history-list/reward-history-list.component';
import { RewardHistoryDetailsComponent} from './reward-history-details/reward-history-detail.component';
@NgModule({
  declarations: [RewardListComponent, RewardDetailsComponent  , RewardHistoryListComponent , RewardHistoryDetailsComponent],
  imports: [
    CommonModule,
    RewardRoutingModule,
    SharedModule

  ],
  providers: [
    RewardListService,
    RewardDetailService,
    RewardHistoryListService
  ]
})
export class RewardModule { }
