import { Component, OnInit, Injector} from '@angular/core';
import { InappropriateDetailsServiceService } from '../inappropriate-details/inappropriate-details-service.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
// import { environment } from 'src/environments/environment.prod';
import { environment } from '../../../environments/environment';
import { Image, PlainGalleryConfig, AdvancedLayout, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';

export interface TableRowData {
  name: string;
  ip: string;
  created: string;
}
@Component({
  selector: 'pb-inappropriate-details',
  templateUrl: './inappropriate-details.component.html',
  styleUrls: ['./inappropriate-details.component.scss']
})
export class InappropriateDetailsComponent implements OnInit {

  public displayedColumns = ['file', 'name', 'ip', 'created'];
  public TABLE_DATA: TableRowData[];
  public dataSource: any;
  public urlInfo: any = {};
  public detailsData: any = [];
  public originUrl: any = '';
  public categoryList: any = [];
  public is_published: boolean = false;
  public isImageFileUpload: boolean = true;
  public isGallery: any = undefined;
  public imagesRect: Image[] = [];
  public customPlainGalleryRowConfig1: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

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

  public openImageModalRow1(image: Image) {
    const index: number = this.getCurrentIndexCustomLayout1(image, this.imagesRect);
    this.customPlainGalleryRowConfig1 = Object.assign({}, this.customPlainGalleryRowConfig1, { layout: new AdvancedLayout(index, true) });
  }

  private getCurrentIndexCustomLayout1(image: Image, imagesRect: Image[]): number {
    return image ? imagesRect.indexOf(image) : -1;
  }

  public ViewDetails() {
    const id = this.urlInfo.currentId;
    const inappropriateDetailsServiceService = this.injector.get(InappropriateDetailsServiceService);
    inappropriateDetailsServiceService.ViewDetails(id).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.detailsData = response['data']['result'];
          this.TABLE_DATA = response['data']['result'][0]['post_spams'];
          this.dataSource = this.TABLE_DATA;
          const self = this;
          this.isGallery = this.detailsData[0].postDetails ? this.detailsData[0].postDetails.post_media
           : this.detailsData[0].sharedPost.post_media;
          this.isGallery.forEach(function (value, index) {
            const imgObj = new Image(index,
               { img: `${environment.origin}/upload/${value.name}` }, );
            self.imagesRect.push(imgObj);
          });
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      }
    );
  }

}
