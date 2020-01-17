import { Component, OnInit, OnDestroy, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { InappropriateListService } from './inappropriate-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment.prod';
import { environment } from '../../../environments/environment';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

export interface TableRowData {
  id: number;
  total_views: number;
  total_comments: number;
  total_likes: number;
  total_share: number;
  total_spam: number;
  created_at: string;
  status: string;
}

@Component({
  selector: 'pb-inappropriate-list',
  templateUrl: './inappropriate-list.component.html',
  styleUrls: ['./inappropriate-list.component.scss']
})
export class InappropriateListComponent implements OnInit {


  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];

  public originUrl: any = '';
  // tslint:disable-next-line:max-line-length
  public displayedColumns = ['id', 'total_views', 'total_comments', 'total_likes', 'total_share', 'total_spam', 'created_at', 'status', 'is_active'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public sortType: string = 'asc';
  public sortBy: string = 'id';
  public selectedStatus: string;

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
    const inappropriateListService = this.injector.get(InappropriateListService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    this.isLoading = true;
    if (this.selectedStatus === 'Select status') {
      this.selectedStatus = '';
    }
    inappropriateListService.getUsers(this.tableConfig.limit, this.tableConfig.pageNo,
       this.tableConfig.searchString, this.sortType, this.sortBy, this.selectedStatus).subscribe(
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
    router.navigate(['inappropriate', 'details', user.id]);
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

  public updateStatus(data: any, status: any): void {
    const inappropriateListService = this.injector.get(InappropriateListService),
      progress = this.injector.get(NgProgress),
      dataObj = {
        pet_id: data.pet_id,
        post_id: data.postDetails ? data.postDetails.post_id : data.sharedPost.post_id,
        status: status
      };
    progress.start();
    this.isLoading = true;
    inappropriateListService.updateStatus(JSON.stringify(dataObj)).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success(response['message'] , 'SUCCESS');
        this.getUsers();
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

  public openDialog(data: any, statusToBeUpdated: string): void {
    const confiromation = this.injector.get(MatDialog);
    const status = statusToBeUpdated.toLocaleLowerCase();
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${status} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.updateStatus(data, statusToBeUpdated);
        }
    });
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getUsers();
  }
}
