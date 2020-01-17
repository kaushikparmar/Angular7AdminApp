import { Component, OnInit, OnDestroy, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { LostFoundListService } from './lost-found-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CommonService } from 'src/common/services/common.service';

export interface TableRowData {
  name: string;
  breed: string;
  location: string;
  gender: string;
  pet_type: string;
  status: string;
  image: string;
}

@Component({
  selector: 'pb-lost-found-list',
  templateUrl: './lost-found-list.component.html',
  styleUrls: ['./lost-found-list.component.scss']
})
export class LostFoundListComponent implements OnInit {

  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];

  public originUrl: any = '';
  public displayedColumns = ['image', 'name', 'breed', 'location', 'gender', 'pet_type', 'status',  'is_active'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public searchPanel: boolean;
  public filterName: string;
  public filterBreed: string;
  public filterLocation: string;
  public filterGender: string;
  public filterCategory: string;
  public categoriesOpt: any = [];
  public startDate: string;
  public endDate: string;
  public sortType: string = 'asc';
  public sortBy: string = 'name';

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
    const lostFoundListService = this.injector.get(LostFoundListService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    this.isLoading = true;
    if (this.filterGender === undefined || this.filterGender === 'Select Gender') {
      this.filterGender = '';
    }
    if (this.filterCategory === undefined || this.filterCategory === 'Select Pet Type') {
      this.filterCategory = '';
    }
    lostFoundListService.getUsers(this.tableConfig.limit, this.tableConfig.pageNo,
      this.tableConfig.searchString, this.filterName, this.filterBreed, this.filterLocation,
      this.filterGender, this.filterCategory, this.startDate, this.endDate,
      this.sortType, this.sortBy).subscribe(
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
    this.getCateList();
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
    this.startDate = '';
    this.endDate = '';
    this.filterName = '';
    this.filterBreed = '';
    this.filterLocation = '';
    this.filterGender = 'Select Gender';
    this.filterCategory = 'Select Pet Type';
    this.getUsers();
  }

  public changeStartDate(): void {
    this.endDate = '';
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getUsers();
  }

  public getCateList(): void {
    const lostFoundListService = this.injector.get(LostFoundListService);
    const progress = this.injector.get(NgProgress);
    lostFoundListService.petTypeDataRequest().subscribe(
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
