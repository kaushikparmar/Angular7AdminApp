import { Component, OnInit, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { RewardDetailService } from './reward-details.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'pb-reward-details',
  templateUrl: './reward-details.component.html',
  styleUrls: ['./reward-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardDetailsComponent implements OnInit {


  public fetchTopicsData: any = [];

  public fetchSubTopicsData: any = [];
  public isSubmited: boolean = false;
  public rewardData: any = [];
  public path: any;
  public isLoading: boolean;
  constructor(
    private injector: Injector,
    private activatedRoutes: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {



    const activateRouter = this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

    this.path = this.activatedRoutes.url['value'][0]['path'];

    if (this.path === 'view' || this.path === 'edit') {
      this.rewardDetails(id);
    }

  }


  public rewardDetails(id) {
    // Inject service
    this.isLoading = true;
    const rewardListservice = this.injector.get(RewardDetailService);
    const progress = this.injector.get(NgProgress);
    const params = {
      id: id
    };
    // Call API
    progress.start();
    rewardListservice.fetchRewardDetail(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0) {
            if ( response['data']['result'][0].event) {
                this.rewardData.event = response['data']['result'][0].event;
            }
            if ( response['data']['result'][0].description) {
              this.rewardData.description = response['data']['result'][0].description;
            }
            if ( response['data']['result'][0].amount) {
              this.rewardData.amount = response['data']['result'][0].amount;
            }

        } else {
          const toaster = this.injector.get(ToastrService);
          toaster.error('Reward Not Found', 'Error');
          const router = this.injector.get(Router);
          router.navigate(['reward/list']);

        }
        progress.complete();
        this.isLoading = false;

      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = false;
      }
    );
  }



  public crudReward(validStatus) {
    this.isSubmited = true;
    if (validStatus === true && this.path === 'edit') {
      const rewardListservice = this.injector.get(RewardDetailService);
      const toaster = this.injector.get(ToastrService);
      const progress = this.injector.get(NgProgress);
      const param = {};
      // Call API
      progress.start();
      this.isLoading = true;
      const activateRouter = this.injector.get(ActivatedRoute);
      param['id'] =  Number(activateRouter.snapshot.paramMap.get('id'));
      param['amount'] =  this.rewardData.amount;
      param['description'] =  this.rewardData.description;
      param['event'] =  this.rewardData.event;

      rewardListservice.updateReward(param).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            toaster.success('Reward updated successfully', 'SUCCESS');
            const router = this.injector.get(Router);
            router.navigate(['/reward/list']);
          }
          progress.complete();
          this.isLoading = false;
        },
        (error: HttpResponse<any>) => {
          console.error(error);
          progress.complete();
          this.isLoading = false;
        }
      );


    }


  }

}
