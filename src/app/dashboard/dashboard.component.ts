import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { HttpResponse } from '../../../node_modules/@angular/common/http';
import { DashboardService } from './dashboard.service';
import { NgProgress } from '../../../node_modules/@ngx-progressbar/core';

export interface TableRowData1 {
  firstName: string;
  email: string;
}
export interface TableRowData2 {
  firstName: string;
  email: string;
}

export interface TableRowData3 {
  firstName: string;
  email: string;
}

export interface TableRowData4 {
  date: string;
  topic: string;
  user: string;
  email: string;
}

export interface TableRowData5 {
  date: string;
  user: string;
  event: string;
  point: number;
}

export interface TableRowData6 {
  date: string;
  tran_id: number;
  amount: number;
  commission: number;
}

export interface TableRowData7 {
  total_booking: number;
  name: string;
  email: string;
  cost: number;
}

export interface TableRowData8 {
  total_booking: number;
  name: string;
  email: string;
  cost: number;
}

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  // data goes here
  public single = [];
  public multi = [];

  public displayedColumns1 = ['first_name', 'email_id', 'type', 'phone'];
  public TABLE_DATA1: TableRowData1[];
  public dataSource1: any;

  public displayedColumns2 = ['service', 'owner_name', 'provider_name', 'amount', 'status'];
  public TABLE_DATA2: TableRowData2[];
  public dataSource2: any;

  public displayedColumns3 = ['date', 'type', 'prt_type', 'user', 'location'];
  public TABLE_DATA3: TableRowData3[];
  public dataSource3: any;

  public displayedColumns4 = ['date', 'topic', 'user', 'email'];
  public TABLE_DATA4: TableRowData4[];
  public dataSource4: any;

  public displayedColumns5 = ['date', 'user', 'event', 'point'];
  public TABLE_DATA5: TableRowData5[];
  public dataSource5: any;

  public displayedColumns6 = ['date', 'tran_id', 'amount', 'commission'];
  public TABLE_DATA6: TableRowData6[];
  public dataSource6: any;

  public displayedColumns7 = ['total_booking', 'name', 'email', 'cost'];
  public TABLE_DATA7: TableRowData7[];
  public dataSource7: any;

  public displayedColumns8 = ['total_booking', 'name', 'email', 'cost'];
  public TABLE_DATA8: TableRowData8[];
  public dataSource8: any;

  view: any[] = [300, 300];
  view1: any[] = [400, 300];

  // options for the piechart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Ammount';
  timeline = true;

  colorScheme = {
    domain: ['#5DFF41', '#FFE205', '#DC3300', '#000000']
  };


  // pie
  showLabels = false;
  explodeSlices = false;
  doughnut = false;

  public bookingCount: number;
  public petOwnerCount: number;
  public serviceProviderCount: number;
  public lostnFoundCount: number;
  public messageCount: number;
  public transactionCount: number;

  public latestUsers: any = [];
  public latestTransactions: any = [];
  public latestLostnFounds: any = [];
  public latestEnquiries: any = [];
  public latestRewards: any = [];
  public latestBookings: any = [];
  public topPetOwner: any = [];
  public topServiceProvider: any = [];

  public dashboardLabels: any = [
    'Total Booking',
    'Total Pet Owner',
    'Total Service Provider',
    'Total Transaction',
    'Total Messages',
    'Total Report'
  ];

  constructor(private injector: Injector) {
  }

  public getDashboardDetails() {
    const dashboardService = this.injector.get(DashboardService);
    const progress = this.injector.get(NgProgress);
    dashboardService.getDashboardDetails().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.bookingCount = response['data']['bookingCount'];
          this.petOwnerCount = response['data']['petOwner'];
          this.serviceProviderCount = response['data']['serviceProvider'];
          this.lostnFoundCount = response['data']['totalLostnFound'];
          this.messageCount = response['data']['totalEnquiries'];
          if (response['data']['totalTransaction'].length) {
            this.transactionCount = response['data']['totalTransaction'][0]['total'];
          }
          this.latestUsers = response['data']['latestUsers'];
          this.latestBookings = response['data']['latestBooking'];
          this.latestLostnFounds = response['data']['latestLostnFound'];
          this.latestEnquiries = response['data']['latestEnquiries'];
          this.latestRewards = response['data']['latestRewards'];
          this.latestTransactions = response['data']['latestTransaction'];
          this.topPetOwner = response['data']['topPetOwner'];
          this.topServiceProvider = response['data']['topServiceProvider'];
          this.bindChartsData(response);
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  public bindChartsData(response) {
    this.single = [];
    this.multi = [];
    for (const key in response['data']['bookingStats'][0]) {
      if (key) {
        this.single.push({
          name: this.capitalizeFirstLetter(key).replace('_', ' '),
          value: response['data']['bookingStats'][0][key]
        });
      }
    }
    response['data']['transactionStats'].forEach(dataElement => {
      this.multi.push({
        'name': dataElement.transaction_month,
        'series': [{
          name: dataElement.transaction_year.toString(),
          value: dataElement.amount
        }]
      });
    });
  }

  public capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public ngOnInit() {
    this.getDashboardDetails();
  }


  public onResize(event) {
    this.view = [event.target.innerWidth - 900, 280];
    // window.dispatchEvent(new Event('resize'))
  }

}
