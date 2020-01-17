import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Image, PlainGalleryConfig, AdvancedLayout, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'pb-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  @Input() profileDetails: any[];
  public originUrl: string = '';
  public currentProfileDetails: any = {};
  public environment = environment;
  public customPlainGalleryRowConfig1: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  public imagesRect: Image[] = [];


  constructor() { }

  ngOnInit() {
    this.originUrl = environment.origin;
    this.currentProfileDetails = this.profileDetails[0];
    console.log(this.profileDetails);

    this.currentProfileDetails['user_galleries'].forEach((imageElement, index) => {
      const  imgObj = new Image(index,
        { img: `${environment.origin}/upload/${imageElement['image']}` },
        { img: `${environment.origin}/upload/thumb/${imageElement['image']}` }
      );
      this.imagesRect.push(imgObj);
    });
  }

  public openImageModalRow1(image: Image) {
    const index: number = this.getCurrentIndexCustomLayout1(image, this.imagesRect);
    this.customPlainGalleryRowConfig1 = Object.assign({}, this.customPlainGalleryRowConfig1, { layout: new AdvancedLayout(index, true) });
  }

  private getCurrentIndexCustomLayout1(image: Image, imagesRect: Image[]): number {
    return image ? imagesRect.indexOf(image) : -1;
  }
}
