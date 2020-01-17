import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { EmailTemplateListService } from './email-template-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { EmailTemplateDetailService } from '../email-template-details/email-template-details.service';

export interface TableRowData {
  key: string;
  subject: string;
  status: string;
  menu: string;
}

@Component({
  selector: 'pb-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.scss']
})
export class EmailTemplateListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isLoading: Boolean = false;
  private subscription: Subscription[] = [];
  public displayedColumns = ['key', 'subject', 'status', 'menu'];
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

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get EmailTemplate List
   */
  public getEmailTemplates() {

      // Inject service
      const emailTemplateListservice = this.injector.get(EmailTemplateListService);
      const progress = this.injector.get(NgProgress);
      // Call API
      progress.start();
      this.isLoading = true;
      emailTemplateListservice.getEmailTemplates(this.tableConfig.limit, this.tableConfig.pageNo, this.tableConfig.searchString).subscribe(
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
   * Edit EmailTemplate
   */
  public edit(emailTemplate: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['email-template', 'edit' , emailTemplate.id]);
  }

/**
   * view EmailTemplate
   */
  public viewDetail(emailTemplate: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['email-template', 'view' , emailTemplate.id]);
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
    this.getEmailTemplates();
  }


/**
 * Instance initalization when component load
 */
  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getEmailTemplates();
  }
  /**
   *
   * @param emailtemplate : Update Template Instance
   * Update Email Template
   */
  public updateEmailTemplate(emailtemplate) {
    const emailTemplateListservice = this.injector.get(EmailTemplateListService);
    const progress = this.injector.get(NgProgress);
    const params : any = {};
    params['id'] = Number(emailtemplate.id);
    params['status'] = !emailtemplate.status;

    // Call API
    progress.start();
    this.isLoading = true;
    emailTemplateListservice.activateDeactivateEmailTemplate(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully' , 'SUCCESS');
        this.getEmailTemplates();
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
   * Memory Raelaease when componennt destroy
   */
  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }
}

