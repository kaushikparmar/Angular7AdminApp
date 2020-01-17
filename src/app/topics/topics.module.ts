import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsRoutingModule } from './topics.routing.module';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { TopicsListService } from './topics-list/topics-list.service';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicDetailService} from './topic-details/topics-details.service';
@NgModule({
  declarations: [
    TopicsListComponent,
    TopicDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TopicsRoutingModule
  ],
  providers: [
    TopicsListService,
    TopicDetailService

  ]
})
export class TopicsModule { }
