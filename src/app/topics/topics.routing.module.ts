import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';

const routes: Routes = [
      {
        path: 'topics',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            data: { title: 'topics-list' },
            component: TopicsListComponent
          },
          {
            path: 'edit/:id',
            data: { title: 'topics-edit' },
            component: TopicDetailsComponent
          },
          {
            path: 'view/:id',
            data: { title: 'topics-view' },
            component: TopicDetailsComponent
          },
          {
            path: 'add',
            data: { title: 'topics-add' },
            component: TopicDetailsComponent
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
