import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { ContactUsListService } from './contact-us-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';


export interface TableRowData {
  topic: string;
  recieved_on: string;
  name: string;
  email_id: string;
  is_active: string;
}


@Component({
  selector: 'pb-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})



export class ContactUsListComponent  implements OnInit, OnDestroy {
  public isLoading: Boolean = false;
  public searchPanel: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  private subscription: Subscription[] = [];



  public displayedColumns = ['topic' , 'recieved_on' , 'name' , 'email_id',  'is_active'] ;
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
  public topicOptions: any = [];
  public filterTopic: string;
  public startDate: string;
  public endDate: string;

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get User List
   */
  public getContactList() {
      // Inject service
      this.TABLE_DATA = [];
      this.dataSource = undefined;
      const userListService = this.injector.get(ContactUsListService );
      const progress = this.injector.get(NgProgress);

      // Call API
      progress.start();
      this.isLoading = true;
      if (this.filterTopic === undefined || this.filterTopic === 'Select Topic') {
        this.filterTopic = '';
      }
      userListService.getContactUsList(true, this.tableConfig.searchString,  this.tableConfig.limit,
        this.tableConfig.pageNo, this.sortType, this.sortBy, this.filterTopic, this.startDate,
        this.endDate).subscribe(
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
          this.isLoading = false;
        }
      );
  }

  /**
   * Page changed from table paginator
   */
  public pageChanged(page: any): void {
    // const d = {previousPageIndex: 0, pageIndex: 0, pageSize: 20, length: 5};
    this.tableConfig.limit = page.pageSize;
    this.tableConfig.pageNo = page.pageIndex + 1;
    this.getContactList();
  }

  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getContactList();
    this.getTopicList();
  }

    /**
   * view Faq
   */
  public view(contact: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['contact-us', 'view' , contact.id]);
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }
  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getContactList();
  }

  public getTopicList(): void {
    const userListService = this.injector.get(ContactUsListService );
    const progress = this.injector.get(NgProgress);
    progress.start();
    this.isLoading = true;
    userListService.getTopicList().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.topicOptions = response['data'];
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
  public filterSearch(): void {
    const toastrService = this.injector.get(ToastrService);
    const commonService = this.injector.get(CommonService);
    if (this.startDate || this.endDate) {
      if (this.startDate && this.endDate) {
        this.startDate = commonService.dateCoversion(this.startDate);
        this.endDate = commonService.dateCoversion(this.endDate);
        this.getContactList();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getContactList();
    }
  }
  public filterClear(): void {
    this.filterTopic = 'Select Topic';
    this.endDate = '';
    this.startDate = '';
    this.getContactList();
  }
  public changeStartDate(): void {
    this.endDate = '';
  }

}
