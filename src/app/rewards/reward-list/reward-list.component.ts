import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { RewardListService } from './reward-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RewardDetailService } from '../reward-details/reward-details.service';
import { CommonService } from 'src/common/services/common.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

export interface TableRowData {
  event: string;
  amt: number;
  status: string;
  created_at: string;
  is_active: string;
}

@Component({
  selector: 'pb-reward-list',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.scss']
})
export class RewardListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoading: Boolean = false;
  private subscription: Subscription[] = [];
  public displayedColumns = ['event', 'amt', 'status' , 'created_at' , 'is_active'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public fetchTopicsData: any = [];
  public fetchSubTopicsData: any = [];

  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public searchPanel: boolean;
  public eventName: string;
  public filterFoints: string;
  public selectedStatus: string;
  public startDate: string;
  public endDate: string;
  public sortType: string = 'asc';
  public sortBy: string = 'event';

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get Reward List
   */
  public getRewards() {

      // Inject service
      const rewardListservice = this.injector.get(RewardListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.selectedStatus === undefined || this.selectedStatus === 'Select status') {
        this.selectedStatus = '';
      }
      rewardListservice.getRewards(this.tableConfig.limit, this.tableConfig.pageNo,
        this.tableConfig.searchString, this.eventName, this.filterFoints, this.selectedStatus,
        this.startDate, this.endDate, this.sortType, this.sortBy).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            // Append Table Data
            this.TABLE_DATA = [];
            this.dataSource = undefined;
            this.tableConfig.totalRecords = response['data']['totalRecords'];
            this.TABLE_DATA = response['data']['result'];
            this.dataSource = this.TABLE_DATA;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

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

  /**
   * Activate/Deactivvate A Reward
   */
  public activateDeactivateReward(reward: any, statusUpdateTo: string) {
    // Inject service
    const userListService = this.injector.get(RewardListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': reward.id};
    if (statusUpdateTo === 'Active') {
      data['is_active'] = true;
    }
    if (statusUpdateTo === 'Deactive') {
      data['is_active'] = false;
    }
    // Call API
    progress.start();
    this.isLoading = true;
    userListService.activateDeactivateReward(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          reward = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Reward ' + statusUpdateTo + 'd', 'SUCCESS');
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

  /**
   * Approve/Reject A Reward
   */
  public approveRejectReward(reward: any, statusUpdateTo: string) {
    // Inject service
    const rewardListservice = this.injector.get(RewardListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': reward.id};
    if (statusUpdateTo === 'Approve') {
      data['admin_verified'] = true;
    }
    if (statusUpdateTo === 'Reject') {
      data['admin_verified'] = false;
    }
    // Call API
    progress.start();
    this.isLoading = true;
    rewardListservice.approveRejectReward(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          reward = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Reward ' + statusUpdateTo + 'd', 'SUCCESS');
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

  /**
   * Edit Reward
   */
  public edit(reward: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['reward', 'edit' , reward.id]);
  }

/**
   * view Reward
   */
  public viewDetail(reward: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['reward', 'view' , reward.id]);
  }

  /**
   * Refresh Table Data
   */
  public refreshTable(): void {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /**
   * Page changed from table paginator
   */
  public pageChanged(page: any): void {
    // const d = {previousPageIndex: 0, pageIndex: 0, pageSize: 20, length: 5};
    this.tableConfig.limit = page.pageSize;
    this.tableConfig.pageNo = page.pageIndex + 1;
    this.getRewards();
  }



  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getRewards();
  }
  public updatereward(reward) {
    const rewardListservice = this.injector.get(RewardDetailService);
    const progress = this.injector.get(NgProgress);
    const params: any = {};
    params['id']  = Number(reward.id);
    params['status']  =  !reward.status;

    // Call API
    progress.start();
    this.isLoading = true;
    rewardListservice.updateReward(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully' , 'SUCCESS');
        this.getRewards();
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
  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public changeStartDate(): void {
    this.endDate = '';
  }

  public filterSearch(): void {
    const toastrService = this.injector.get(ToastrService);
    const commonService = this.injector.get(CommonService);
    if (this.startDate || this.endDate) {
      if (this.startDate && this.endDate) {
        this.startDate = commonService.dateCoversion(this.startDate);
        this.endDate = commonService.dateCoversion(this.endDate);
        this.getRewards();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getRewards();
    }
  }

  public clearFilter(): void {
    this.endDate = '';
    this.startDate = '';
    this.filterFoints = '';
    this.eventName = '';
    this.selectedStatus = 'Select status';
    this.getRewards();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getRewards();
  }

  public openDialog(reward: any): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${!reward.status ? 'activate' : 'inactivate'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.updatereward(reward);
        }
    });
  }

}

