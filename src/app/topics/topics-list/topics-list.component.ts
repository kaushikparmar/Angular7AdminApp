import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { TopicsListService } from './topics-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicDetailService } from '../topic-details/topics-details.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';



export interface TableRowData {
  category: string;
  subcategory: string;
  status: boolean;
  created: string;
  is_active: string;
}


@Component({
  selector: 'pb-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})



export class TopicsListComponent  implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  private subscription: Subscription[] = [];



  public displayedColumns = ['category' , 'subcategory' , 'status' , 'created',  'is_active'] ;
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public isLoading: boolean;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public sortType: string = 'asc';
  public sortBy: string = 'name';
  public searchPanel: boolean;
  public filterTopic: string;
  public subTopic: string;
  public selectedStatus: string;

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get User List
   */
  public gettopicsList() {
      // Inject service
      this.isLoading = true;
      const userListService = this.injector.get(TopicsListService );
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      if (this.selectedStatus === undefined || this.selectedStatus === 'Select status') {
        this.selectedStatus = '';
      }
      userListService.getTopicsList(this.tableConfig.limit, this.tableConfig.pageNo,
         this.tableConfig.searchString, this.sortType, this.sortBy,
         this.filterTopic, this.selectedStatus).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            // Append Table Data
            this.TABLE_DATA = [];
            this.dataSource = undefined;
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
          this.isLoading = false;
          progress.complete();
        }
      );
  }

  /**
   *
   * @param topics Topics Data
   */
  public updateStatus(topics) {
    const params = {};

    const topicDetailService = this.injector.get(TopicDetailService);
    const progress = this.injector.get(NgProgress);
    params['updateTopics'] = [
      {
        'id': Number(topics.id),
        'status' : !topics.status
      }
    ];
    topicDetailService.editTopics(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully' , 'Success');
          this.gettopicsList();
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
   * Page changed from table paginator
   */
  public pageChanged(page: any): void {
    // const d = {previousPageIndex: 0, pageIndex: 0, pageSize: 20, length: 5};
    this.tableConfig.limit = page.pageSize;
    this.tableConfig.pageNo = page.pageIndex + 1;
    this.gettopicsList();
  }
  /**
   * Edit Faq
   */
  public edit(topics: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['topics', 'edit' , topics.id]);
  }
  public view(topics: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['topics', 'view' , topics.id]);
  }


  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }

    this.gettopicsList();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public clearFilter(): void {
    this.filterTopic = '';
    this.subTopic = '';
    this.selectedStatus = 'Select status';
    this.gettopicsList();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    if (sort.active === 'status') {
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    }
    this.sortBy = sort.active === 'subName' ? 'name' : sort.active;
    this.gettopicsList();
  }

  public openDialog(topics: any): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${!topics.status ? 'activate' : 'inactivate'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.updateStatus(topics);
        }
    });
  }

}
