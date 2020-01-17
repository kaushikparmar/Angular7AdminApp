import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { BlogCategoryListService } from './blog-category-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

export interface TableRowData {
  title: string;
  status: string;
  created: string;
  action: string;
}


@Component({
  selector: 'pb-blog-category-list',
  templateUrl: './blog-category-list.component.html',
  styleUrls: ['./blog-category-list.component.scss']
})

export class BlogCategoryListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];

  public isLoading: Boolean = false;
  public displayedColumns = ['title', 'status', 'created', 'action'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public originUrl: any = '';
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public searchPanel: boolean;
  public filterTitle: string;
  public selectedStatus: string;
  public sortType: string = 'asc';
  public sortBy: string = 'title';

  constructor(
    private injector: Injector
  ) { }

    /**
   * Get User List
   */
  public getBlogsList() {
      // Inject service
      const blogCategoryListService = this.injector.get(BlogCategoryListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.selectedStatus === undefined || this.selectedStatus === 'Select status') {
        this.selectedStatus = '';
      }
      blogCategoryListService.getBlogsList(this.tableConfig.limit, this.tableConfig.pageNo,
        this.tableConfig.searchString, this.filterTitle, this.selectedStatus,
        this.sortType, this.sortBy).subscribe(
        (response: HttpResponse<any>) => {
          progress.complete();
          this.isLoading = false;
          if (response['code'] === 200) {
            // Append Table Data
            this.tableConfig.totalRecords = response['data']['totalRecords'];
            this.TABLE_DATA = response['data']['rows'];
            this.dataSource = this.TABLE_DATA;
            // this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (error: HttpResponse<any>) => {
          console.error(error);
          this.isLoading = false;
          progress.complete();
        }
      );
  }

  /**
   * Activate/Deactivvate A User
   */
  public activateDeactivateUser(user: any, statusUpdateTo: string, publishedStatus: string) {
    // Inject service
    const blogCategoryListService = this.injector.get(BlogCategoryListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': user.id};
    if (statusUpdateTo) {
      data['status'] = (statusUpdateTo === 'Active') ? true : false;
    }
    // Call API
    progress.start();
    blogCategoryListService.activateDeactivateUser(data).subscribe(
      (response: HttpResponse<any>) => {
        progress.complete();
        if (response['code'] === 200) {
          // Update Table Data
          user = response['data'];
          this.refreshTable();
          this.getBlogsList();
          // Show success toast message
          toastrService.success('Status updated successfully', 'SUCCESS');
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  public onDeleteBlog () {

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
   }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    if (sort.active === 'status') {
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    }
    this.sortBy = sort.active;
    this.getBlogsList();
  }

  public clearFilter(): void {
    this.filterTitle = '';
    this.selectedStatus = 'Select status';
    this.getBlogsList();
  }

  public openDialog(category: any, statusToBeUpdated: string, publishedStatus: string): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${statusToBeUpdated === 'Active' ? 'activate' : 'inactivate'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.activateDeactivateUser(category, statusToBeUpdated, publishedStatus);
        }
    });
  }

}


