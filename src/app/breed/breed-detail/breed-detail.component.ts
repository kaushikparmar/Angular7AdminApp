import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreedListService } from '../breed-list/breed-list.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BreedDetailService } from './breed-detail.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'pb-breed-detail',
  templateUrl: './breed-detail.component.html',
  styleUrls: ['./breed-detail.component.scss']
})
export class BreedDetailComponent implements OnInit {

  public breedsData: any =  {
    'name': undefined,
    'breed': null,

  };
  public path: string = 'add';
  public fetchBreedTypeData = [];
  public isLoading: boolean;
  public isSubmited: boolean;
  constructor(private injector: Injector,
    private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {
    const activateRouter = this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

    this.path = this.activatedRoutes.url['value'][0]['path'];
    if (this.path === 'view' || this.path === 'edit') {
      this.getBreedList(id);
    }
    this.getPetList();
  }


  public getBreedList(id: any) {
    // Inject service
    this.isLoading = true;
    const breedListService = this.injector.get(BreedListService);
    const router = this.injector.get(Router);
    const toaster = this.injector.get(ToastrService);

    // Call API
    breedListService.getBreedList(false, id).subscribe(
      (response: HttpResponse<any>) => {

        if (response['code'] === 200 && response['data']['totalRecords'] !== 0) {
          this.isLoading = false;
          if (Object.prototype.toString.call(response['data']['result'][0] === '[object Object]')) {
            this.breedsData['name'] = response['data']['result'][0]['name'];
            this.breedsData['breed'] = Number(response['data']['result'][0]['pet_type_id']);

          }
        } else {
          this.isLoading = false;
          toaster.error('Breed not found', 'error');
          router.navigate(['/breed/list']);
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        router.navigate(['/breed/list']);
        this.isLoading = false;
      }
    );
  }

  public getPetList() {
    this.isLoading = true;

    // Inject service
    const faqListservice = this.injector.get(BreedDetailService);
    const progress = this.injector.get(NgProgress);
    this.fetchBreedTypeData = [];
    // Call API
    progress.start();
    faqListservice.fetchPet().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
            if (Object.prototype.toString.call(response['data']) === '[object Array]') {
                this.fetchBreedTypeData = response['data'];
            }
        }
        progress.complete();
        this.isLoading = false;
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        this.isLoading = false;

        progress.complete();
      }
    );






  }


  /**
    *
    * @param breed Breed Data
    */
  public updateBreed() {
    this.isLoading = true;
    const params = {};

    const activateRouter = this.injector.get(ActivatedRoute);
    const topicDetailService = this.injector.get(BreedDetailService);
    const progress = this.injector.get(NgProgress);
    params['breedUpdateData'] = [
      {
        'id': Number(activateRouter.snapshot.paramMap.get('id')),
        'pet_type_id': Number(this.breedsData.breed),
        'name': this.breedsData.name
      }
    ];
    topicDetailService.editBreed(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Status updated successfully', 'Success');
          const router = this.injector.get(Router);
          router.navigate(['breed/list']);
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
  *
  * @param breed Breed Data
  */
  public addBreed() {
    this.isLoading = true;
    const params = {};
    const topicDetailService = this.injector.get(BreedDetailService);
    const progress = this.injector.get(NgProgress);
    params['breedData'] = [
      {
        'pet_type_id': Number(this.breedsData.breed),
        'name': this.breedsData.name
      }
    ];
    topicDetailService.addBreed(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          const toaster = this.injector.get(ToastrService);
          toaster.success('Breed Added successfully', 'Success');
          const router = this.injector.get(Router);
          router.navigate(['breed/list']);
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

  public crudBreed(isform: any) {
    this.isSubmited = true;
    if (this.path === 'edit' && this.isSubmited === true && isform.valid) {
      this.updateBreed();
    } else if (this.path === 'add' && this.isSubmited === true && isform.valid) {
      this.addBreed();
    }
  }

}
