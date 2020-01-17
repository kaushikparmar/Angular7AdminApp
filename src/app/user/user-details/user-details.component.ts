import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService } from './user-details.service';
import { Injector } from '@angular/core';

@Component({
  selector: 'pb-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserDetailsComponent implements OnInit {

  public isLoading: Boolean = false;
  public profileDetails: any = [];
  public favoriteList: any = [];
  public serviceDetails: any = [];
  public userRole: string = '';
  public serviceAvailabilities: any = [];

  constructor(private injector: Injector) { }

  /**
   * Angular Lifecycle Event For Component Initialization
   */
  public ngOnInit(): void {
    this.getusers();
  }

  public getusers() {
    this.isLoading = true;
    const activateRouter = this.injector.get(ActivatedRoute);
    const params = {};
    params['id'] = activateRouter.url['value'][activateRouter.url['value'].length - 1].path;
    const userDetailsService = this.injector.get(UserDetailsService);
    userDetailsService.getUsers(params).subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          if (response['data']['result'].length) {
            this.userRole = response['data']['result'][0]['fk_user_role']['type'];
            this.favoriteList = response['data']['result'][0]['favoritelists'];
            this.serviceDetails = response['data']['result'][0]['answers'];
            this.serviceAvailabilities = response['data']['result'][0]['service_availabilities'];
            this.profileDetails = response['data']['result'];
          }
        }
      },
      (error: HttpResponse<any>) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

}


