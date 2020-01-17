import { Component, OnInit, Input } from '@angular/core';

export interface FavTableRowData {
  firstName: string;
  address: string;
  email: string;
  phone: string;
  created_at: string;
}

@Component({
  selector: 'pb-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  @Input() favoriteList: any[];
  public favDisplayedColumns = ['first_name', 'email', 'phone', 'created_at'];
  public FAV_TABLE_DATA: FavTableRowData[];
  public favDataSource: any;
  constructor() { }

  ngOnInit() {
    this.favDataSource = this.favoriteList;
  }

}
