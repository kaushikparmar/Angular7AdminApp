import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { CustomAdsListService } from './custom-ads-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CustomAdsDetailService } from '../custom-ads-details/custom-ads-details.service';
import { CommonService } from 'src/common/services/common.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

export interface TableRowData {
  banner: string;
  section: string;
  isPublished: string;
  from_date: string;
  to_date: string;
  menu: string;
}

@Component({
  selector: 'pb-custom-ads-list',
  templateUrl: './custom-ads-list.component.html',
  styleUrls: ['./custom-ads-list.component.scss']
})
export class CustomAdsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoading: Boolean = false;
  private subscription: Subscription[] = [];
  public displayedColumns = ['banner', 'section', 'isPublished', 'from_date', 'to_date' , 'menu'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public environmentImageSource = environment;
  public fetchTopicsData: any = [];
  public fetchSubTopicsData: any = [];
  public sectionData: any = [
    {
      'name' : '',
      'type' : 'All'
    },
  {
    'name' : 'blog',
    'type' : 'Blog'
  },
  {
    'name' : 'press',
    'type' : 'Press'
  },
  {
    'name' : 'search',
    'type' : 'Search'
  },
  {
    'name' : 'social_media',
    'type' : 'Social Media'
  }
];

  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    section: undefined ,
    isPublished : undefined
  };

  public searchPanel: boolean;
  public filterVerified: string;
  public filterStatus: string;
  public startDate: string;
  public endDate: string;
  public sortType: string = 'asc';
  public sortBy: string = 'section';

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get Ads List
   */
  public getCustomAdsList() {

    // Inject service
    const faqListservice = this.injector.get(CustomAdsListService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    this.isLoading = true;
    if (this.filterVerified === undefined || this.filterVerified === 'Select Section') {
      this.filterVerified = '';
    }
    if (this.filterStatus === undefined || this.filterStatus === 'Select Type') {
      this.filterStatus = '';
    }
    faqListservice.getCustomAds(this.tableConfig.limit, this.tableConfig.pageNo,
      this.tableConfig.searchString, this.filterVerified, this.filterStatus,
      this.startDate, this.endDate, this.sortType, this.sortBy).subscribe(
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
        progress.complete();
        this.isLoading = false;
      }
    );
}





  /**
   * Edit Faq
   */
  public edit(ads: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['custom-ads', 'edit' , ads.id]);
  }

/**
   * view Faq
   */
  public viewDetail(ads: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['custom-ads', 'view' , ads.id]);
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
    this.getCustomAdsList();
  }



  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getCustomAdsList();
  }
  public updatecustom(ads) {
    const faqListservice = this.injector.get(CustomAdsDetailService);
    const progress = this.injector.get(NgProgress);

    const formData: any = new FormData();
    let publishedType: boolean;
    formData.append('id' , Number(ads.id));
      if (ads.is_published === 0) {
        publishedType = true;
      }
       if (ads.is_published === 1) {
        publishedType = false;
      }
     if (publishedType === true || publishedType === false) {
       formData.append('is_published' , publishedType);
     }


    // Call API
    progress.start();
    this.isLoading = true;
    faqListservice.updateFaq(formData).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully' , 'SUCCESS');
        this.getCustomAdsList();
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

  public openDialog(ads: any): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${ads.is_published ? 'unpublished' : 'published'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.updatecustom(ads);
        }
    });
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
        this.getCustomAdsList();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getCustomAdsList();
    }
  }

  public changeStartDate(): void {
    this.endDate = '';
  }

  public clearFilter(): void {
    this.startDate = '';
    this.endDate = '';
    this.filterVerified = 'Select Section';
    this.filterStatus = 'Select Type';
    this.getCustomAdsList();
  }
  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    if (sort.active === 'is_published') {
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    }
    this.sortBy = sort.active;
    this.getCustomAdsList();
  }

}

