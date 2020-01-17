import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsPagesRoutingModule } from './cms-pages.routing.module';
import { CmsPagesListComponent } from './cms-pages-list/cms-pages-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { CmsPagesListService } from './cms-pages-list/cms-pages-list.service';
import { CmsPagesDetailsComponent } from './cms-pages-details/cms-pages-details.component';
import { CmsPagesDetailService } from './cms-pages-details/cms-pages-details.service';
import { HomeContentComponent } from './home-content/home-content.component';
import {HomeContentService} from './home-content/home-content.service';
@NgModule({
  declarations: [
    CmsPagesDetailsComponent,
    CmsPagesListComponent,
    HomeContentComponent
  ],
  imports: [
    CommonModule,
    CmsPagesRoutingModule,
    SharedModule
  ],
  providers: [
    CmsPagesDetailService,
    CmsPagesListService,
    HomeContentService
   ]
})
export class CmsPagesModule { }
