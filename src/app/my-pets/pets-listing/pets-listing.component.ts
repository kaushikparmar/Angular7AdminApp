import { Component, OnInit, OnDestroy, ViewChild, Injector } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, Sort} from '@angular/material';
import { Subscription } from 'rxjs';
import { PetsListingService } from './pets-listing.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { BlogListService } from 'src/app/blog/blog-list/blog-list.service';


export interface TableRowData {
  profile_pic: string;
  name: string;
  type: string;
  breed: string;
  owner: string;
  created_at: string;
}

@Component({
  selector: 'pb-pets-listing',
  templateUrl: './pets-listing.component.html',
  styleUrls: ['./pets-listing.component.scss']
})
export class PetsListingComponent implements OnInit {
  @ViewChild('myname') input; 
  public isLoading: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscription: Subscription[] = [];
  public dropDownToggle:Boolean = true;
  public originUrl: any = '';
  public displayedColumns = ['profile_pic', 'name', 'type', 'breed', 'owner', 'created_at', 'action'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public tableConfig: any = {
    limit: 10,
    pageNo: 1,
    totalRecords: 0,
    searchString: undefined
  };

  public filterPetName: string = '';
  public filterBreed: string = '';
  public filterOwnerName: string = '';
  public filterPetType: number = 0;
  public categoriesOpt: any = [];
  public sortType: string = 'asc';
  public sortBy: string = 'name';
  public searchPanel: boolean;

  constructor(
    private injector: Injector
  ) { }

  /**
   * Get User List
   */
  public getUsers() {

    this.TABLE_DATA = [];
    this.dataSource = undefined;
    // Inject service
    const petListingService = this.injector.get(PetsListingService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    this.isLoading = true;
    petListingService.getPetListing(
      this.tableConfig.limit,
      this.tableConfig.pageNo,
      this.tableConfig.searchString,
      this.filterPetName,
      this.filterBreed,
      this.filterOwnerName,
      this.filterPetType,
      this.sortType,
      this.sortBy
    ).subscribe(
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
        this.isLoading = true;
      }
    );
  }

  /**
   * View User
   */
  public viewDetail(user: any): void {
    const router = this.injector.get(Router);
    router.navigate(['manage-pets', 'view', user.id]);
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
    this.getUsers();
  }


  ngOnInit() {
    this.getUsers();
    this.originUrl = environment.origin;
    this.getCategoriesList();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public getCategoriesList(): void {
    // Inject service
    const blogListService = this.injector.get(BlogListService);
    const progress = this.injector.get(NgProgress);
    // Prepare Data
    blogListService.petTypeDataRequest().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.categoriesOpt = response['data'];
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  public clearFilter(): void {
    this.filterPetName = '';
    this.filterBreed = '';
    this.filterOwnerName = '';
    this.filterPetType = 0;
    this.tableConfig['pageNo'] = 1;
    this.getUsers();
  }

  public sortData(sort: Sort): void {
    this.sortType = sort.direction ? sort.direction : 'asc';
    this.sortBy = sort.active;
    this.getUsers();
  }


}
