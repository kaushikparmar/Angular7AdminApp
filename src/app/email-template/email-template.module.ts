import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { EmailTemplateListService } from './email-template-list/email-template-list.service';
import { EmailTemplateDetailsComponent } from './email-template-details/email-template-details.component';
import { EmailTemplateDetailService } from './email-template-details/email-template-details.service';
@NgModule({
  declarations: [EmailTemplateListComponent, EmailTemplateDetailsComponent],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    SharedModule

  ],
  providers: [
    EmailTemplateListService,
    EmailTemplateDetailService
  ]
})
export class EmailTemplateModule { }
