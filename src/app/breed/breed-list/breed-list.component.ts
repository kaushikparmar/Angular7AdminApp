import { Component, OnInit, OnDestroy , ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { BreedListService } from './breed-list.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BreedDetailService } from '../breed-detail/breed-detail.service';
import { ConfiromationModalComponent } from 'src/common/components/confiromation-modal/confiromation-modal.component';



export interface TableRowData {
  breename: string;
  breedtype: string;
  status: string;
  created: string;
  options: string;
}


@Component({
  selector: 'pb-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})



export class BreedListComponent  implements OnInit, OnDestroy {
  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  private subscription: Subscription[] = [];



  public displayedColumns = ['breename' , 'breedtype' , 'status' , 'created', 'options'] ;
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };
  public searchPanel: boolean;
  public filterName: string;
  public filterCategory: string;
  public categoriesOpt: any = [];
  public selectedStatus: string;
  public sortType: string = 'asc';
  public sortBy: string = 'name';

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get User List
   */
  public getBreedList() {
      // Inject service
      this.TABLE_DATA = [];

      const userListService = this.injector.get(BreedListService );
      const progress = this.injector.get(NgProgress);

      // Call API
      progress.start();
      this.isLoading = true;
      if (this.selectedStatus === undefined || this.selectedStatus === 'Select status') {
        this.selectedStatus = '';
      }
      if (this.filterCategory === undefined || this.filterCategory === 'Select Category') {
        this.filterCategory = '';
      }
      userListService.getBreedList(true, this.tableConfig.searchString,  this.tableConfig.limit,
        this.tableConfig.pageNo, this.filterName, this.filterCategory, this.selectedStatus,
        this.sortType, this.sortBy).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            // Append Table Data
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
   * Page changed from table paginator
   */
  public pageChanged(page: any): void {
    // const d = {previousPageIndex: 0, pageIndex: 0, pageSize: 20, length: 5};
    this.tableConfig.limit = page.pageSize;
    this.tableConfig.pageNo = page.pageIndex + 1;
    this.getBreedList();
  }

  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Records per page.';
    }
    this.getCategoryList();
    this.getBreedList();
  }

    /**
   * view Faq
   */
  public edit(breed: any): void {
    // Inject service & Redirect to edit screen
    const router = this.injector.get(Router);
    router.navigate(['breed', 'edit' , breed.id]);
  }


  /**
   *
   * @param breed Topics Data
   */
  public updateStatus(breed) {
    this.isLoading = true;
    const params = {};

    const topicDetailService = this.injector.get(BreedDetailService);
    const progress = this.injector.get(NgProgress);
    params['breedUpdateData'] = [
      {
        'id': Number(breed.id),
        'status' : !breed.status
      }
    ];
    topicDetailService.editBreed(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully' , 'Success');
          this.getBreedList();
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

  public clearFilter(): void {
    this.selectedStatus = 'Select status';
    this.filterCategory = 'Select Category';
    this.filterName = '';
    this.getBreedList();
  }

  public getCategoryList(): void {
    const breedListService = this.injector.get(BreedListService);
    const progress = this.injector.get(NgProgress);
    breedListService.getCategoryList().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.categoriesOpt = response['data'];
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

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    if (sort.active === 'status') {
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    }
    this.sortBy = sort.active;
    this.getBreedList();
  }

  public openDialog(breed: any): void {
    const confiromation = this.injector.get(MatDialog);
    const dialogRef = confiromation.open(ConfiromationModalComponent, {
      width: '250px',
      data: { content: `Are you sure want to ${!breed.status ? 'activate' : 'inactivate'} ?`}
    });
    dialogRef.afterClosed().subscribe( (result) => {
        if (result) {
          this.updateStatus(breed);
        }
    });
  }

}
