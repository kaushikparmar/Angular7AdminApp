import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { FaqListService } from './faq-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FaqDetailService } from '../faq-details/faq-details.service';
import { CommonService } from 'src/common/services/common.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

export interface TableRowData {
  topic: string;
  subtopic: string;
  question: string;
  isactive: string;
  created_at: string;
  updated_at: string;
  is_active: string;
}

@Component({
  selector: 'pb-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoading: boolean = false;
  private subscription: Subscription[] = [];
  public displayedColumns = ['topic', 'subtopic', 'question', 'isactive' , 'created_at', 'updated_at' , 'is_active'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public fetchTopicsData: any = [];
  public fetchSubTopicsData: any = [];
  public sortType: string = 'asc';
  public sortBy: string = 'name&isTopic=true';
  public searchPanel: boolean = false;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public topicName: string;
  public subTopicName: string;
  public question: string;
  public selectedStatus: string;
  public startDate: string;
  public endDate: string;

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get Faq List
   */
  public getFaqs() {

      // Inject service
      const faqListservice = this.injector.get(FaqListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      if (this.selectedStatus && this.selectedStatus === 'Select status') {
        this.selectedStatus = '';
      }
      faqListservice.getFaqs(this.tableConfig.limit, this.tableConfig.pageNo, this.tableConfig.searchString,
        this.sortType, this.sortBy, this.topicName, this.subTopicName, this.question, this.selectedStatus,
        this.startDate, this.endDate).subscribe(
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
  public activateDeactivateFaq(faq: any, statusUpdateTo: string) {
    // Inject service
    const userListService = this.injector.get(FaqListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': faq.id};
    if (statusUpdateTo === 'Active') {
      data['is_active'] = true;
    }
    if (statusUpdateTo === 'Deactive') {
      data['is_active'] = false;
    }
    // Call API
    progress.start();
    this.isLoading = true;
    userListService.activateDeactivateFaq(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          faq = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Faq ' + statusUpdateTo + 'd', 'SUCCESS');
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
   * Approve/Reject A Faq
   */
  public approveRejectFaq(faq: any, statusUpdateTo: string) {
    // Inject service
    const faqListservice = this.injector.get(FaqListService);
    const progress = this.injector.get(NgProgress);
    const toastrService = this.injector.get(ToastrService);
    // Prepare Data
    const data = {'id': faq.id};
    if (statusUpdateTo === 'Approve') {
      data['admin_verified'] = true;
    }
    if (statusUpdateTo === 'Reject') {
      data['admin_verified'] = false;
    }
    // Call API
    progress.start();
    this.isLoading = true;
    faqListservice.approveRejectFaq(data).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Update Table Data
          faq = response['data'];
          this.refreshTable();
          // Show success toast message
          toastrService.success('Faq ' + statusUpdateTo + 'd', 'SUCCESS');
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
  public edit(faq: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['faq', 'edit' , faq.id]);
  }

/**
   * view Faq
   */
  public viewDetail(faq: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['faq', 'view' , faq.id]);
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
    this.getFaqs();
  }



  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getFaqs();
  }
  public updatefaq(faq) {
    const faqListservice = this.injector.get(FaqDetailService);
    const progress = this.injector.get(NgProgress);
    const formData: any = new FormData();
    formData.append('id' , Number(faq.id));
    formData.append('is_active' , !faq.is_active);

    // Call API
    progress.start();
    this.isLoading = true;
    faqListservice.updateFaq(formData).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully' , 'SUCCESS');
        this.getFaqs();
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
  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }
  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getFaqs();
  }

  public changeStartDate(): void {
    this.endDate = '';
  }

  public filterSearch(): void {
    const toastrService = this.injector.get(ToastrService);
    const commonService = this.injector.get(CommonService);
    if (this.startDate || this.endDate) {
      if (this.startDate && this.endDate) {
        this.startDate = commonService.dateCoversion(this.startDate);
        this.endDate = commonService.dateCoversion(this.endDate);
        this.getFaqs();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getFaqs();
    }
  }

  public clearFilter(): void {
    this.endDate = '';
    this.startDate = '';
    this.topicName = '';
    this.subTopicName = '';
    this.question = '';
    this.selectedStatus = 'Select status';
    this.getFaqs();
  }

  public openDialog(faq: any): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${!faq.is_active ? 'activate' : 'inactivate'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.updatefaq(faq);
        }
    });
  }

}

