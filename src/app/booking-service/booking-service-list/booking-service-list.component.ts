import { Component, OnInit, OnDestroy, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { BookingServiceListService } from './booking-service-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CommonService } from 'src/common/services/common.service';

export interface TableRowData {
  order_id: number;
  pet_owner_name: string;
  service_provider_name: string;
  service_type: string;
  status: string;
  created_at: any;
}

@Component({
  selector: 'pb-booking-service-list',
  templateUrl: './booking-service-list.component.html',
  styleUrls: ['./booking-service-list.component.scss']
})
export class BookingServiceListComponent implements OnInit {

  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];

  public originUrl: any = '';
  public displayedColumns = ['order_id', 'pet_owner_name',  'service_provider_name', 'service_type', 'status', 'created_at',  'view'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public searchPanel: boolean;
  public filterOrderId: string;
  public filterPetOwner: string;
  public filterServiceProvider: string;
  public filterServiceType: string;
  public filterStatus: string;
  public startDate: string;
  public endDate: string;
  public sortType: string = 'asc';
  public sortBy: string = 'id';
  public categoriesOpt: any = [];
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
    const bookingServiceListService = this.injector.get(BookingServiceListService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    this.isLoading = true;
    if (this.filterServiceType === undefined || this.filterServiceType === 'Select Type') {
      this.filterServiceType = '';
    }
    if (this.filterStatus === undefined || this.filterStatus === 'Select Status') {
      this.filterStatus = '';
    }
    bookingServiceListService.getUsers(this.tableConfig.limit, this.tableConfig.pageNo,
      this.tableConfig.searchString, this.filterOrderId, this.filterPetOwner,
      this.filterServiceProvider, this.filterServiceType, this.filterStatus, this.startDate,
      this.endDate, this.sortType, this.sortBy).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Append Table Data
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
        this.isLoading = true;
      }
    );
  }

  /**
   * View User
   */
  public view(user: any): void {
    console.log(user.id);
    const router = this.injector.get(Router);
    router.navigate(['/booking-service/details', user.id]);
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
    this.typeList();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
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
    this.filterOrderId = '';
    this.filterPetOwner = '';
    this.filterServiceProvider = '';
    this.filterServiceType = 'Select Type';
    this.filterStatus = 'Select Status';
    this.startDate = '';
    this.endDate = '';
    this.getUsers();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.endDate = '';
    this.startDate = '';
    this.getUsers();
  }

  public changeStartDate(): void {
    this.endDate = '';
  }

  public typeList(): void {
    const bookingServiceListService = this.injector.get(BookingServiceListService);
    const progress = this.injector.get(NgProgress);
    progress.start();
    this.isLoading = true;
    bookingServiceListService.typeList().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.categoriesOpt = response['data'];
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
}
