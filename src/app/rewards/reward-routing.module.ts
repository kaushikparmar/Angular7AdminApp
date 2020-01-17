import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardListComponent } from './reward-list/reward-list.component';
import { RewardDetailsComponent } from './reward-details/reward-details.component';
import { RewardHistoryListComponent } from './reward-history-list/reward-history-list.component';
import { RewardHistoryDetailsComponent} from './reward-history-details/reward-history-detail.component';
const routes: Routes = [
  {
    path: 'reward',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        data: { title: 'reward-list' },
        component: RewardListComponent
      },
      {
        path: 'edit/:id',
        component: RewardDetailsComponent,
        data: { title: 'edit-reward' }
      },
      {
        path: 'view/:id',
        component: RewardDetailsComponent,
        data: { title: 'view-reward' }
      } ,
    ]
  },
  {
    path: 'reward-history',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: RewardHistoryListComponent
      } ,
      {
        path: 'view/:id',
        component: RewardHistoryDetailsComponent,
        data: { title: 'view-reward-history' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule { }
