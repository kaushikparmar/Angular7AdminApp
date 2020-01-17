import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { CmsPagesListService } from './cms-pages-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CmsPagesDetailService } from '../cms-pages-details/cms-pages-details.service';
import { CommonService } from 'src/common/services/common.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

export interface TableRowData {
  name: string;
  content: string;
  status: boolean;
  created_at: Date;
  menu: string;

}

@Component({
  selector: 'pb-cms-pages-list',
  templateUrl: './cms-pages-list.component.html',
  styleUrls: ['./cms-pages-list.component.scss']
})
export class CmsPagesListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoading: Boolean = false;
  private subscription: Subscription[] = [];
  public displayedColumns = ['name',  'status', 'created_at', 'menu'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public fetchTopicsData: any = [];
  public fetchSubTopicsData: any = [];

  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public sortType: string = 'asc';
  public sortBy: string = 'name';
  public searchPanel: boolean;
  public filterName: string;
  public selectedStatus: string;
  public startDate: string;
  public endDate: string;

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get Faq List
   */
  public getCmsPages() {

      // Inject service
      const cmsPagesListService = this.injector.get(CmsPagesListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.selectedStatus === undefined || this.selectedStatus === 'Select status') {
        this.selectedStatus = '';
      }
      cmsPagesListService.getCMSPages(this.tableConfig.limit, this.tableConfig.pageNo,
         this.tableConfig.searchString, this.sortType, this.sortBy, this.filterName,
         this.selectedStatus, this.startDate, this.endDate).subscribe(
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
   * Activate/Deactivvate A Faq
   */
  public updatecms(cmspagespages: any) {
    // Inject service
    const userListService = this.injector.get(CmsPagesListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': cmspagespages.id};
    data['status'] = !cmspagespages['status'];

    // Call API
    progress.start();
    this.isLoading = true;
    userListService.updateCms(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          cmspagespages = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Status updated successfully' , 'SUCCESS');
          this.getCmsPages();
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
  public edit(cmspages: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['cms-pages', 'edit' , cmspages.id]);
  }

/**
   * view Faq
   */
  public viewDetail(cmspages: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['cms-pages', 'view' , cmspages.id]);
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
    this.getCmsPages();
  }



  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getCmsPages();
  }
  // public updatecmspagespages(cmspagespages) {
  //   const cmspagespagesListservice = this.injector.get(CmsPagesDetailService);
  //   const progress = this.injector.get(NgProgress);
  //   const formData: any = new FormData();
  //   formData.append('id' , Number(cmspagespages.id));
  //   formData.append('is_active' , !cmspagespages.is_active);

  //   // Call API
  //   progress.start();
  //   this.isLoading = true;
  //   cmspagespagesListservice.updateFaq(formData).subscribe(
  //     (response: HttpResponse<any>) => {
  //       if (response['code'] === 200) {
  //         const toaster = this.injector.get(ToastrService);
  //         toaster.success('Status updated successfully' , 'SUCCESS');
  //       this.getCmsPages();
  //       }
  //       progress.complete();
  //       this.isLoading = false;
  //     },
  //     (error: HttpResponse<any>) => {
  //       console.error(error);
  //       progress.complete();
  //       this.isLoading = false;
  //     }
  //   );
  // }
  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }
  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getCmsPages();
  }

  public changeStartDate(): void {
    this.endDate = '';
  }

  public clearFilter(): void {
    this.filterName = '';
    this.selectedStatus = 'Select status';
    this.startDate = '';
    this.endDate = '';
    this.getCmsPages();
  }

  public filterSearch(): void {
    const toastrService = this.injector.get(ToastrService);
    const commonService = this.injector.get(CommonService);
    if (this.startDate || this.endDate) {
      if (this.startDate && this.endDate) {
        this.startDate = commonService.dateCoversion(this.startDate);
        this.endDate = commonService.dateCoversion(this.endDate);
        this.getCmsPages();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getCmsPages();
    }
  }

  public openDialog(cms: any): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${!cms.status ? 'activate' : 'inactivate'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.updatecms(cms);
        }
    });
  }

}

