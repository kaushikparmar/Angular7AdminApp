// Angular Library Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Custom Imports
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { LogoutService } from './logout/logout.service';
import { ChangePasswordService } from './change-password/change-password.service';
import {ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [
    LoginService,
    LogoutService,
    ChangePasswordService
  ]
})
export class AuthModule { }
