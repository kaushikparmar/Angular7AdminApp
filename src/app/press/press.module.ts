import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PressRoutingModule } from './press-routing.module';
import { SharedModule } from '../../common/modules/shared.module';
import { PressListComponent } from './press-list/press-list.component';
import { PressListService } from './press-list/press-list.service';

import { PressDetailsComponent } from './press-details/press-details.component';
import { PressDetailsService } from './press-details/press-details.service';

import { PressCategoryListComponent } from './press-category-list/press-category-list.component';
import { PressCategoryListService } from './press-category-list/press-category-list.service';

import { PressCategoryDetailsComponent } from './press-category-details/press-category-details.component';
import { PressCategoryDetailsService } from './press-category-details/press-category-details.service';


@NgModule({
  declarations: [
    PressListComponent,
    PressDetailsComponent,
    PressCategoryListComponent,
    PressCategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    PressRoutingModule,
    SharedModule
  ],
  providers: [
    PressListService,
    PressDetailsService,
    PressCategoryListService,
    PressCategoryDetailsService
  ]
})
export class PressModule { }
