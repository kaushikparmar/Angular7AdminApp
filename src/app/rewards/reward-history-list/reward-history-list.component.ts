import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { RewardHistoryListService } from './reward-history-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonService } from 'src/common/services/common.service';


export interface TableRowData {
  user: string;
  event: string;
  description: string;
  type: string;
  points: number;
  created_at: string;
  menu: string;
}

@Component({
  selector: 'pb-rewardhistory-list',
  templateUrl: './reward-history-list.component.html',
  styleUrls: ['./reward-history-list.component.scss']
})
export class RewardHistoryListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoading: Boolean = false;
  private subscription: Subscription[] = [];
  public displayedColumns = ['user' , 'event', 'description', 'type', 'points', 'created_at' , 'menu'];
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
  public userName: string;
  public eventName: string;
  public filterType: string;
  public startDate: string;
  public endDate: string;
  public sortType: string = 'asc';
  public sortBy: string = 'name';

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get RewardHistory List
   */
  public getRewards() {

      // Inject service
      const rewardListservice = this.injector.get(RewardHistoryListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.filterType === undefined || this.filterType === 'Select Type') {
        this.filterType = '';
      }
      rewardListservice.getRewards(true, this.tableConfig.searchString, this.tableConfig.limit,
        this.tableConfig.pageNo, this.userName, this.eventName, this.filterType,
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
   * view RewardHistory
   */
  public viewDetail(RewardHistory: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['reward-history', 'view' , RewardHistory.id]);
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
    this.startDate = '';
    this.endDate = '';
    this.userName = '';
    this.eventName = '';
    this.filterType = 'Select Type';
    this.getRewards();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getRewards();
  }
}

