import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsRoutingModule } from './contact-us.routing.module';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { ContactUsListService } from './contact-us-list/contact-us-list.service';
import { ContactUsDetailComponent } from './contact-us-detail/contact-us-detail.component';

@NgModule({
  declarations: [
    ContactUsListComponent,
    ContactUsDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactUsRoutingModule
  ],
  providers: [
    ContactUsListService,

  ]
})
export class ContactUsModule { }
