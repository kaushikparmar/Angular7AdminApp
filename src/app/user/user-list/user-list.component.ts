import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog} from '@angular/material';
import { Subscription } from 'rxjs';
import { UserListService } from './user-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfiromationModalComponent } from '../../../common/components/confiromation-modal/confiromation-modal.component';
export interface TableRowData {
  name: string;
  email: string;
  mobile: string;
  is_verified: boolean;
  admin_verified: boolean;
  status: boolean;
  is_active: boolean;
  user_type: string;
  created_on: string;
  updated_on: string;
}


@Component({
  selector: 'pb-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit, OnDestroy {
  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];


  public displayedColumns = ['name', 'email', 'is_verified', 'admin_verified', 'status',
   'user_type', 'created_on', 'updated_on', 'is_active'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };

  public searchPanel: boolean;
  public filterName: string = '';
  public filterEmail: string = '';
  public filterMobile: string = '';
  public filterVerified: string;
  public filterAdminVerified: string = '';
  public filterStatus: string;
  public filterType: number = 0;
  public sortType: string = 'asc';
  public sortBy: string = 'name';

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get User List
   */
  public getUsers() {
      // Inject service
      const userListService = this.injector.get(UserListService);
      const progress = this.injector.get(NgProgress);
      let params = '';
      if (this.tableConfig.limit) {
        params = params + `limit=${this.tableConfig.limit}`;
      }
      if (this.tableConfig.pageNo) {
        params = params + `&page=${this.tableConfig.pageNo}`;
      }
      if (this.tableConfig.searchString && this.tableConfig.searchString.trim()) {
        params = params + `&search=${this.tableConfig.searchString.trim()}`;
      }
      if (this.filterName && this.filterName.trim()) {
        params = params + `&name=${this.filterName.trim()}`;
      }
      if (this.filterEmail && this.filterEmail.trim()) {
        params = params + `&email=${this.filterEmail.trim()}`;
      }
      if (this.filterMobile && this.filterMobile.trim()) {
        params = params + `&mobile=${this.filterMobile.trim()}`;
      }
      if (this.filterVerified) {
        params = params + `&is_verified=${this.filterVerified}`;
      }
      if (this.filterType) {
        params = params + `&user_Type=${this.filterType}`;
      }
      if (this.filterAdminVerified) {
        params = params + `&admin_verified=${this.filterAdminVerified}`;
      }
      if (this.filterStatus) {
        params = params + `&is_active=${this.filterStatus}`;
      }
      if (this.sortType) {
        params = params + `&sortType=${this.sortType}`;
      }
      if (this.sortBy) {
        params = params + `&sortBy=${this.sortBy}`;
      }
      // Call API
      progress.start();
      this.isLoading = true;
      userListService.getUsers(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            this.TABLE_DATA = [];
            this.dataSource = undefined;
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
          this.isLoading = false;
        }
      );
  }

  /**
   * Activate/Deactivvate A User
   */
  public activateDeactivateUser(user: any, statusUpdateTo: string) {
    // Inject service
    const userListService = this.injector.get(UserListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': user.id};
    if (statusUpdateTo === 'Active') {
      data['is_active'] = true;
    }
    if (statusUpdateTo === 'Deactive') {
      data['is_active'] = false;
    }
    // Call API
    progress.start();
    this.isLoading = true;
    userListService.activateDeactivateUser(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          user = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Status updated successfully', 'SUCCESS');
        }
        progress.complete();
        this.isLoading = true;
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = true;
      }
    );
  }

  /**
   * Approve/Reject A User
   */
  public approveRejectUser(user: any, statusUpdateTo: string) {
    // Inject service
    const userListService = this.injector.get(UserListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': user.id};
    const ownerData = {'user_id': user.id};
    if (statusUpdateTo === 'Approve') {
      data['admin_verified'] = true;
      ownerData['admin_verified'] = 'Yes';
    }
    if (statusUpdateTo === 'Reject') {
      data['admin_verified'] = false;
      ownerData['admin_verified'] = 'No';
    }
    // Call API
    progress.start();
    this.isLoading = true;
    const approveAPI = (user.req_for_provider) ? userListService.approveOwnerToProviderUser(ownerData)
     : userListService.approveRejectUser(data);
    approveAPI.subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          user = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Status updated successfully', 'SUCCESS');
        }
        progress.complete();
        this.isLoading = true;
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = true;
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
   * View User
   */
  public view(user: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['/user/view/' + user.id]);
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
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
     this.getUsers();
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public clearFilter(): void {
    this.filterName = '';
    this.filterEmail = '';
    this.filterMobile = '';
    this.filterVerified = '';
    this.filterAdminVerified = '';
    this.filterStatus = '';
    this.filterType = 0;
    this.tableConfig['pageNo'] = 1;
    this.getUsers();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    if (sort.active === 'is_verified') {
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    }
    if (sort.active === 'is_active') {
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    }
    this.sortBy = sort.active;
    this.getUsers();
  }

  public openDialog(user: any, statusToBeUpdated: string): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${statusToBeUpdated === 'Approve' ? 'approve'
      : (statusToBeUpdated === 'Active' ? 'activate' : 'deactivate')} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          if (statusToBeUpdated !== 'Approve') {
            this.activateDeactivateUser(user, statusToBeUpdated);
          } else if (statusToBeUpdated === 'Approve') {
            this.approveRejectUser(user, statusToBeUpdated);
          } else {
            // if new specific status coming then use else block.
          }
        }
    });
  }

}


