import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { BlogListService } from './blog-list.service';
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
  selector: 'pb-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})

export class BlogListComponent implements OnInit, OnDestroy {
  public searchPanel: Boolean = false;
  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];


  public displayedColumns = ['file', 'title', 'status', 'blog_category', 'created', 'action'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public originUrl: any = '';
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public filterTitle: string = '';
  public filterStatus: string = '';
  public filterCategory: string = '';
  public categoriesOpt: any = [];
  public sortType: string = 'asc';
  public sortBy: string = 'title';
  public startDate: string;
  public endDate: string;

  constructor(
    private injector: Injector
  ) { }

    /**
   * Get User List
   */
  public getBlogsList() {
      // Inject service
      const blogListService = this.injector.get(BlogListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.filterStatus === 'Select Status') {
        this.filterStatus = '';
      }
      if (this.filterCategory === 'Select Category') {
        this.filterCategory = '';
      }
      blogListService.getBlogsList(this.tableConfig.limit, this.tableConfig.pageNo,
        this.tableConfig.searchString, this.filterTitle, this.filterStatus, this.filterCategory,
        this.sortType, this.sortBy, this.startDate, this.endDate).subscribe(
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
    const blogListService = this.injector.get(BlogListService);
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
    blogListService.activateDeactivateUser(data).subscribe(
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
    const blogListService = this.injector.get(BlogListService);
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
    blogListService.approveRejectUser(data).subscribe(
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
   * view Faq
   */
  public viewDetail(blog: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['blog', 'view-blog' , blog.id]);
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
    this.getBlogsList();
    this.originUrl = environment.origin;
    this.getCategoriesList();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public getCategoriesList(): void {
    // Inject service
    const blogListService = this.injector.get(BlogListService);
    const progress = this.injector.get(NgProgress);
    // Prepare Data
    blogListService.petTypeDataRequest().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.categoriesOpt = response['data'];
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
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
    this.filterTitle = '';
    this.filterStatus = 'Select Status';
    this.filterCategory = 'Select Category';
    this.tableConfig['pageNo'] = 1;
    this.endDate = '';
    this.startDate = '';
    this.getBlogsList();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.endDate = '';
    this.startDate = '';
    this.getBlogsList();
  }

  public changeStartDate(): void {
    this.endDate = '';
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


