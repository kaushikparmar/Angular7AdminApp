import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { RatesService } from './rates.service';
import { ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';


@Component({
  selector: 'pb-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatesComponent implements OnInit {
  /** variable for loader */
  public isLoading: Boolean = false;
  public rateDetails: any = [];

  constructor(private injector: Injector) { }

  ngOnInit() {
    this.getRates(1);
  }

  public getRates(pet_type_id) {
    this.isLoading = true;
    const params = {};
    const activateRouter = this.injector.get(ActivatedRoute);
    params['id'] = Number(activateRouter.snapshot.paramMap.get('id'));
    params['pet_type_id'] = pet_type_id;
    const ratesService = this.injector.get(RatesService);
    ratesService.getRates(params).subscribe(
      (response: HttpResponse<any>) => {
        this.isLoading = false;
        if (response['code'] === 200) {
          this.rateDetails = response['data']['rows'];
        }
      },
      (error: HttpResponse<any>) => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  public onTabChange(event) {
    if (event) {
      const currentPetTypeId = event.index + 1;
      this.getRates(currentPetTypeId);
    }
  }

}
