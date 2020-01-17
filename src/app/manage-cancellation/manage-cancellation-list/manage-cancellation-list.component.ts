import { Component, OnInit, OnDestroy, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { ManageCancellationListService } from './manage-cancellation-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CommonService } from 'src/common/services/common.service';

export interface TableRowData {
  id: number;
  // is_hour:any;
  time: any;
  status:any;
  created_date:string;
  updated_date:string;
}


@Component({
  selector: 'pb-manage-cancellation-list',
  templateUrl: './manage-cancellation-list.component.html',
  styleUrls: ['./manage-cancellation-list.component.scss']
})
export class ManageCancellationListComponent implements OnInit {

  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];

  public data_commission:any = [];
  public originUrl: any = '';
  public displayedColumns = ['id','time',  'status', 'created_at', 'updated_at',];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public searchPanel: boolean;
  public startDate: string;
  public endDate: string;
  public sortType: string = 'asc';
  public sortBy: string = 'id';

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get User List
   */
  public getUsers() {
    this.TABLE_DATA = [];
    this.dataSource = undefined;
    // Inject service
    const manageCancellationListService = this.injector.get(ManageCancellationListService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    this.isLoading = true;
    manageCancellationListService.getUsers(this.tableConfig.limit, this.tableConfig.pageNo,
      this.tableConfig.searchString, this.startDate, this.endDate, this.sortType, this.sortBy).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // commisssion data
          this.data_commission = response['data']['commission'];

          // Append Table Data
          this.tableConfig.totalRecords = response['data']['cancellationTimeLogs']['totalRecords'];
          this.TABLE_DATA = response['data']['cancellationTimeLogs']['result'];
          this.dataSource = this.TABLE_DATA;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          const self = this;
          this.dataSource.forEach((value, index) => {
            if (index === 0) {
              self.dataSource[index].status = 'Current';
            } else {
              self.dataSource[index].status = ' ';
            }
          });
        }
        progress.complete();
        this.isLoading = false;
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = true;
      }
    );
  }

  /**
   * View User
   */
  public view(user: any): void {
    const router = this.injector.get(Router);
    router.navigate(['lost-and-found', 'details', user.id]);
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
    this.getUsers();
  }

  ngOnInit() {
    this.getUsers();
    this.originUrl = environment.origin;
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
        this.getUsers();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getUsers();
    }
  }

  public clearFilter(): void {
    this.startDate = '';
    this.endDate = '';
    this.getUsers();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getUsers();
  }
}
