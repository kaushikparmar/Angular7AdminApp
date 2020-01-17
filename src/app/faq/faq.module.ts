import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqListComponent } from './faq-list/faq-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { FaqListService } from './faq-list/faq-list.service';
import { FaqDetailsComponent } from './faq-details/faq-details.component';
import { FaqDetailService } from './faq-details/faq-details.service';
@NgModule({
  declarations: [FaqListComponent, FaqDetailsComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    SharedModule

  ],
  providers: [
    FaqListService,
    FaqDetailService
  ]
})
export class FaqModule { }
