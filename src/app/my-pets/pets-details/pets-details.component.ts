import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Image, PlainGalleryConfig, AdvancedLayout, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';
import { PetDetailsService } from '../pets-details/pet-details.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'pb-pets-details',
  templateUrl: './pets-details.component.html',
  styleUrls: ['./pets-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PetsDetailsComponent implements OnInit {

  public urlInfo: any = {};
  public petDetails: any = {};
  public ownerDetails: any = {};
  public lbSize:any = undefined;
  public detailsData: any = [];
  public isGallery:any = undefined;
  public originUrl: any = '';
  public categoryList: any = [];
  public is_published: boolean = false;
  public isImageFileUpload: boolean = true;
  public isLoading: Boolean = false;
  public dob:any;
  public formatedDob:any = undefined;
  public customPlainGalleryRowConfig1: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  public imagesRect: Image[] = [
    
  ];

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

    /** Get specific blog data in edit blog page */
    public ViewDetails() {
      const params = {};
      params['id'] = this.urlInfo.currentId;
      const petDetailsService = this.injector.get(PetDetailsService);
      petDetailsService.ViewDetails(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            this.detailsData = response['data']['result'][0];
            this.petDetails = response['data']['result'][0].fk_pet_deatils_pet_type;
            this.ownerDetails = response['data']['result'][0].fk_pet_deatils_owner_id;
            this.lbSize = response['data']['result'][0].size;
            this.lbSize = this.lbSize * 2.2;
            this.lbSize = this.lbSize.toFixed();
            this.formatedDob = response['data']['result'][0].dob;
            
            // this.formatedDob = new Date("mm-dd-yy");
            this.formatedDob = new Date(this.formatedDob);
            this.formatedDob = this.formatedDob.toLocaleDateString();
            const self = this;
            this.isGallery = this.detailsData.pet_galleries;
            this.detailsData.pet_galleries.forEach(function (value, index) {
              const imgObj = new Image(self.detailsData.pet_galleries[index].id, { img: `${environment.origin}/upload/${self.detailsData.pet_galleries[index].image}` },);
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
