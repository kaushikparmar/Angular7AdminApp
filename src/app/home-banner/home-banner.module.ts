import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeBannerRoutingModule } from './home-banner-routing.module';
import { HomeBannerListComponent } from './home-banner-list/home-banner-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { HomeBannerListService } from './home-banner-list/home-banner-list.service';
import { HomeBannerDetailsComponent } from './home-banner-details/home-banner-details.component';
import {HomeBannerDetailService} from './home-banner-details/home-banner-details.service';
@NgModule({
  declarations: [HomeBannerListComponent, HomeBannerDetailsComponent],
  imports: [
    CommonModule,
    HomeBannerRoutingModule,
    SharedModule

  ],
  providers: [
    HomeBannerListService,
    HomeBannerDetailService
  ]
})
export class HomeBannerModule { }
