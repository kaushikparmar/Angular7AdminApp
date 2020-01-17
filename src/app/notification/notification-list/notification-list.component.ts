import { Component, OnInit, OnDestroy, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { NotificationListService } from './notification-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CommonService } from '../../../common/services/common.service';


export interface TableRowData {
  message: any;
  created_at: any;
  read: any;
}

@Component({
  selector: 'pb-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];
  public allRecords: any = [];
  public collect_id: any = [];
  public data_commission: any = [];
  public originUrl: any = '';
  public displayedColumns = ['message', 'created_at', 'read'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public isAllRead: any = [];
  public id: number;
  public is_read: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };

  constructor(
    private injector: Injector,
    private commonService: CommonService
  ) { }

  /**
   * Get User List
   */
  public getNotifications() {
    this.TABLE_DATA = [];
    this.dataSource = undefined;
    // Inject service
    const notificationListService = this.injector.get(NotificationListService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    this.isLoading = true;
    notificationListService.getNotifications(this.tableConfig.limit, this.tableConfig.pageNo, this.tableConfig.searchString).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Append Table Data
          this.tableConfig.totalRecords = response['data']['totalRecords'];
          this.TABLE_DATA = response['data']['result'];
          this.allRecords = response['data']['result'];
          const self = this;
          if (this.allRecords.length) {
            this.allRecords.forEach((element, index) => {
              const id = element.id;
              self.collect_id.push(id);
            });
          }
          this.dataSource = this.TABLE_DATA;
          this.isAllRead = this.dataSource.filter(dataElement => {
            return dataElement.is_read === true;
          });
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

  public updateNotification(notification) {
    const params = {};
    params['id'] = notification.id;
    params['is_read'] = true;
    const toastrService = this.injector.get(ToastrService);
    const notificationListService = this.injector.get(NotificationListService);
    notificationListService.updateNotification(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          notification.is_read = true;
          this.isAllRead = this.dataSource.filter(dataElement => {
            return dataElement.is_read === true;
          });
          this.commonService.notificationReadAction();
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }

  public clearAllNotification() {
    const params = {};
    params['id'] = this.collect_id;
    const toastrService = this.injector.get(ToastrService);
    const notificationListService = this.injector.get(NotificationListService);
    notificationListService.clearAllNotification(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          toastrService.success('All clear successfully', 'SUCCESS');
          this.getNotifications();
          // notification.is_read = true; 
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }

  public readAllNotification() {
    const params = {};
    params['id'] = this.collect_id;
    const toastrService = this.injector.get(ToastrService);
    const notificationListService = this.injector.get(NotificationListService);
    notificationListService.readAllNotification(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          toastrService.success('All read successfully', 'SUCCESS');
          this.commonService.notificationReadAction();
          this.getNotifications();
          // notification.is_read = true; 
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }

  /**
   * Redirect to relevant page
   */

  public navigate(user: any): void {
    const router = this.injector.get(Router);
    if (user.activity_type === 'user') {
      router.navigate(['/user/view', user.source_id]);
    } else if (user.activity_type === 'lost_found') {
      router.navigate(['lost-and-found/details', user.source_id]);
    } else if (user.activity_type === 'enquiry') {
      router.navigate(['contact-us/view', user.source_id]);
    } else if (user.activity_type === 'rewards') {
      router.navigate(['reward-history/view', user.source_id]);
    } else if (user.activity_type === 'booking') {
      router.navigate(['booking-service/details', user.source_id]);
    }
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
    this.getNotifications();
  }

  ngOnInit() {
    this.getNotifications();
    this.originUrl = environment.origin;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
