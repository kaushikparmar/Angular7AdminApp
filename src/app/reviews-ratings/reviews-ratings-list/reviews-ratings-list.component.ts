import { Component, OnInit, Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgProgress } from '@ngx-progressbar/core';
import { ReviewsRatingsListService } from './reviews-ratings-list.service';
import { Sort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/common/services/common.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';

@Component({
  selector: 'pb-reviews-ratings-list',
  templateUrl: './reviews-ratings-list.component.html',
  styleUrls: ['./reviews-ratings-list.component.scss']
})
export class ReviewsRatingsListComponent implements OnInit {
  public isLoading: Boolean = false;
  public dataSource: any;
  public displayedColumns = ['pet_owner', 'service_provider', 'description', 'ratings', 'created_on', 'updated_on', 'action'];
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public sortType: string = 'asc';
  public sortBy: string = 'name&isPetOwner=true';
  public searchPanel: boolean;
  public selectedNumber: string;
  public startDate: string;
  public endDate: string;

  constructor(private injector: Injector) { }

  ngOnInit() {
    this.getReviewList();
  }

  public getReviewList() {
    this.isLoading = true;
    const progress = this.injector.get(NgProgress);

    progress.start();
    const pressListService = this.injector.get(ReviewsRatingsListService);
    if (this.selectedNumber === undefined || this.selectedNumber === 'Select rating') {
      this.selectedNumber = '';
    }
    pressListService.getReviewList(this.tableConfig.limit, this.tableConfig.pageNo,
       this.tableConfig.searchString, this.sortType, this.sortBy, this.selectedNumber,
       this.startDate, this.endDate).subscribe(
      (response: HttpResponse<any>) => {
        progress.complete();
        this.isLoading = false;
        if (response['code'] === 200) {
          this.tableConfig.totalRecords = response['data']['totalRecords'];
          this.dataSource = response['data']['result'];
        }
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
    this.getReviewList();
  }

  public onDelete(currentReviw) {
    this.isLoading = true;
    const params = {};
    params['id'] = currentReviw.id;
    params['is_deleted'] =  true;
    const progress = this.injector.get(NgProgress);

    const pressListService = this.injector.get(ReviewsRatingsListService);
    pressListService.deleteReview(params).subscribe(
      (response: HttpResponse<any>) => {
        progress.complete();
        this.isLoading = false;
        if (response['code'] === 200) {
          this.getReviewList();
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
        this.isLoading = false;
      }
    );
  }

  public openDialog(review: any): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to delete ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.onDelete(review);
        }
    });
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getReviewList();
  }

  public filterSearch(): void {
    const toastrService = this.injector.get(ToastrService);
    const commonService = this.injector.get(CommonService);
    if (this.startDate || this.endDate) {
      if (this.startDate && this.endDate) {
        this.startDate = commonService.dateCoversion(this.startDate);
        this.endDate = commonService.dateCoversion(this.endDate);
        this.getReviewList();
      } else {
        toastrService.error(`Please select ${this.startDate ? 'end' : 'start'} date`, 'ERROR');
      }
    } else {
      this.endDate = '';
      this.startDate = '';
      this.getReviewList();
    }
  }

  public clearFilter(): void {
    this.endDate = '';
    this.startDate = '';
    this.selectedNumber = 'Select rating';
    this.getReviewList();
  }

  public changeStartDate(): void {
    this.endDate = '';
  }

}
