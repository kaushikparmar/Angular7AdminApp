import { Component, OnInit, Injector} from '@angular/core';
import { LostFoundDetailsService } from '../lost-found-details/lost-found-details.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'pb-lost-found-details',
  templateUrl: './lost-found-details.component.html',
  styleUrls: ['./lost-found-details.component.scss']
})
export class LostFoundDetailsComponent implements OnInit {

  public urlInfo: any = {};
  public detailsData: any = [];
  public originUrl: any = '';
  public categoryList: any = [];
  public is_published: boolean = false;
  public isImageFileUpload: boolean = true;

  constructor(private injector: Injector, private router: Router, private activatedRoute: ActivatedRoute) {
    this.urlInfo.currentState = this.activatedRoute.url['value'][0].path;
    if (this.activatedRoute.url['value'][1]) {
      this.urlInfo.currentId = parseInt(this.activatedRoute.url['value'][1].path, 10);
    }
  }

  ngOnInit() {
      this.ViewDetails();
      this.originUrl = environment.origin;
  }



  /** Get specific blog data in edit blog page */
  public ViewDetails() {
    const params = {};
    params['id'] = this.urlInfo.currentId;
    const lostFoundDetailsService = this.injector.get(LostFoundDetailsService);
    lostFoundDetailsService.ViewDetails(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.detailsData = response['data'];
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }
}
