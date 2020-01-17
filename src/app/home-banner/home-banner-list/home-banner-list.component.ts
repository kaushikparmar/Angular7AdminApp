import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { HomeBannerListService } from './home-banner-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HomeBannerDetailService } from '../home-banner-details/home-banner-details.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfiromationModalComponent } from '../../../common/components/confiromation-modal/confiromation-modal.component';
export interface TableRowData {
  banner: string;
  title: string;
  status: string;
  created_at: string;
  menu: string;
}

@Component({
  selector: 'pb-home-banner-list',
  templateUrl: './home-banner-list.component.html',
  styleUrls: ['./home-banner-list.component.scss']
})
export class HomeBannerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoading: Boolean = false;
  private subscription: Subscription[] = [];
  public displayedColumns = ['banner', 'title', 'status' , 'created_at', 'menu'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public environmentImageSource = environment;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    section: undefined ,
    isPublished : undefined
  };

  constructor(
    private injector: Injector,
  ) { }

  /**
   * Get Faq List
   */
  public getHomeBannerList() {

      // Inject service
      const faqListservice = this.injector.get(HomeBannerListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      faqListservice.getHomeBanner(true, this.tableConfig.searchString , this.tableConfig.limit, this.tableConfig.pageNo).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            // Append Table Data
            this.TABLE_DATA = [];
            this.dataSource = undefined;
            this.tableConfig.totalRecords = response['data']['totalRecords'];
            this.TABLE_DATA = response['data']['response'];
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
    router.navigate(['home-banner', 'edit' , ads.id]);
  }

/**
   * view Faq
   */
  public viewDetail(ads: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['home-banner', 'view' , ads.id]);
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
    this.getHomeBannerList();
  }

/**
 * Home Banner Update Status
 */
  public updateBanner(reward) {
    const rewardListservice = this.injector.get(HomeBannerListService);
    const progress = this.injector.get(NgProgress);
    const params: any = {};
    params['id']  = Number(reward.id);
    params['status']  =  !reward.status;

    // Call API
    progress.start();
    this.isLoading = true;
    rewardListservice.activateDeactivateHomeBanner(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully' , 'SUCCESS');
          this.getHomeBannerList();
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
 * Home Banner Update Status
 */
public deleteBanner(banner) {
  const rewardListservice = this.injector.get(HomeBannerListService);
  const progress = this.injector.get(NgProgress);
  const params: any = {};
  params['id']  = Number(banner.id);
  params['is_deleted'] =  true;

  // Call API
  progress.start();
  this.isLoading = true;
  rewardListservice.deleteHomeBanner(params).subscribe(
    (response: HttpResponse<any>) => {
      if (response['code'] === 200) {
        const toaster = this.injector.get(ToastrService);
        toaster.success('Banner Deleted successfully' , 'SUCCESS');
        this.getHomeBannerList();
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

public openDialog(banner): void {
  const confiromation = this.injector.get(MatDialog);
  const dialogRef = confiromation.open(ConfiromationModalComponent, {
    width: '250px',
    data: { content: 'Are you sure want to delete home banner ?'}
  });

  dialogRef.afterClosed().subscribe( (result) => {
      if (result) {
        this.deleteBanner(banner);
      }
  });
}

public openDialogForStatus(banner: any): void {
  const confiromation = this.injector.get(MatDialog);
  const dialogRef = confiromation.open(ConfiromationModalComponent, {
    width: '250px',
    data: { content: `Are you sure want to ${!banner.status ? 'activate' : 'inactivate'} ?`}
  });
  dialogRef.afterClosed().subscribe( (result) => {
      if (result) {
        this.updateBanner(banner);
      }
  });
}


  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getHomeBannerList();
  }



  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }
}

