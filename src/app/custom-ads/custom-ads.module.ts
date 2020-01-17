import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomAdsRoutingModule } from './custom-ads-routing.module';
import { CustomAdsListComponent } from './custom-ads-list/custom-ads-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { CustomAdsListService } from './custom-ads-list/custom-ads-list.service';
import { CustomAdsDetailsComponent } from './custom-ads-details/custom-ads-details.component';
import {CustomAdsDetailService} from './custom-ads-details/custom-ads-details.service';
@NgModule({
  declarations: [CustomAdsListComponent, CustomAdsDetailsComponent],
  imports: [
    CommonModule,
    CustomAdsRoutingModule,
    SharedModule

  ],
  providers: [
    CustomAdsListService,
    CustomAdsDetailService
  ]
})
export class CustomAdModule { }
