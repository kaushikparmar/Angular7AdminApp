import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserListComponent,
    data: { title: 'user' }
  },
  {
    path: 'user/:view',
    component: UserDetailsComponent,
    data: { title: 'user-details' }
  },
  {
    path: 'user/:view/:id',
    component: UserDetailsComponent,
    data: { title: 'user-details' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
