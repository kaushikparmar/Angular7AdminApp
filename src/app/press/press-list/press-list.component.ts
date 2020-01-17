import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { PressListService } from './press-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CommonService } from 'src/common/services/common.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

export interface TableRowData {
  name: string;
  email: string;
  mobile: string;
  is_verified: boolean;
  is_active: boolean;
  user_type: string;
  created_on: string;
  updated_on: string;
}


@Component({
  selector: 'pb-press-list',
  templateUrl: './press-list.component.html',
  styleUrls: ['./press-list.component.scss']
})

export class PressListComponent implements OnInit, OnDestroy {
  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];


  public displayedColumns = ['file', 'title', 'status', 'press_category', 'created', 'action'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public originUrl: any = '';
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public sortType: string = 'asc';
  public sortBy: string = 'title';
  public searchPanel: boolean = false;
  public title: string;
  public selectedStatus: string;
  public filterCategory: string;
  public startDate: string;
  public endDate: string;
  public categoriesOpt: any = [];

  constructor(
    private injector: Injector
  ) { }

    /**
   * Get User List
   */
  public getBlogsList() {
      // Inject service
      const pressListService = this.injector.get(PressListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.selectedStatus === undefined || this.selectedStatus === 'Select status') {
        this.selectedStatus = '';
      }
      if (this.filterCategory === undefined || this.filterCategory === 'Select Category') {
        this.filterCategory = '';
      }
      pressListService.getBlogsList(this.tableConfig.limit, this.tableConfig.pageNo,
         this.tableConfig.searchString, this.sortType, this.sortBy, this.title, this.selectedStatus,
         this.filterCategory, this.startDate, this.endDate).subscribe(
        (response: HttpResponse<any>) => {
          progress.complete();
          this.isLoading = false;
          if (response['code'] === 200) {
            // Append Table Data
            this.tableConfig.totalRecords = response['data']['totalRecords'];
            this.TABLE_DATA = response['data']['response'];
            this.dataSource = this.TABLE_DATA;
            // this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (error: HttpResponse<any>) => {
          console.error(error);
          progress.complete();
          this.isLoading = false;
        }
      );
  }

  /**
   * Activate/Deactivvate A User
   */
  public activateDeactivateUser(user: any, statusUpdateTo: string, publishedStatus: string) {
    // Inject service
    const pressListService = this.injector.get(PressListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': user.id};
    if (statusUpdateTo) {
      data['status'] = (statusUpdateTo === 'Active') ? 1 : 0;
    }
    if (publishedStatus) {
      data['is_published'] = (publishedStatus === 'Published') ? true : false;
    }
    // Call API
    progress.start();
    pressListService.activateDeactivateUser(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          user = response['data'];
          this.refreshTable();
          this.getBlogsList();
          // Show success toast message
          toastrService.success('Status updated successfully', 'SUCCESS');
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  /**
   * Approve/Reject A User
   */
  public approveRejectUser(user: any, statusUpdateTo: string) {
    // Inject service
    const pressListService = this.injector.get(PressListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': user.id};
    if (statusUpdateTo === 'Approve') {
      data['admin_verified'] = true;
    }
    if (statusUpdateTo === 'Reject') {
      data['admin_verified'] = false;
    }
    // Call API
    progress.start();
    pressListService.approveRejectUser(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          user = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Status updated successfully', 'SUCCESS');
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  /**
   * Edit User
   */
  public edit(user: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['/user', user.id]);
  }

  /**
   * Refresh Table Data
   */
  public refreshTable(): void {
    // this.paginator._changePageSize(this.paginator.pageSize);
  }

  /**
   * Page changed from table paginator
   */
  public pageChanged(page: any): void {
    // const d = {previousPageIndex: 0, pageIndex: 0, pageSize: 20, length: 5};
    this.tableConfig.limit = page.pageSize;
    this.tableConfig.pageNo = page.pageIndex + 1;
    this.getBlogsList();
  }

  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getCategoryList();
    this.getBlogsList();
    this.originUrl = environment.origin;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getBlogsList();
  }

  private getCategoryList(): void {
    const pressListService = this.injector.get(PressListService);
    const progress = this.injector.get(NgProgress);
    progress.start();
    pressListService.getCategoryList().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.categoriesOpt = response['data']['rows'];
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
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
        this.getBlogsList();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getBlogsList();
    }
  }

  public clearFilter(): void {
    this.title = '';
    this.selectedStatus = 'Select status';
    this.filterCategory = 'Select Category';
    this.startDate = '';
    this.endDate = '';
    this.getBlogsList();
  }

  public openDialog(user: any, statusToBeUpdated: string, publishedStatus: string): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${publishedStatus === 'Published'
        ? 'published' : 'unpublished'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.activateDeactivateUser(user, statusToBeUpdated, publishedStatus);
        }
    });
  }

}


