import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { ContactUsListService } from '../contact-us-list/contact-us-list.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pb-contact-us-detail',
  templateUrl: './contact-us-detail.component.html',
  styleUrls: ['./contact-us-detail.component.scss']
})
export class ContactUsDetailComponent implements OnInit {
  public fetchedContactInfo = {
    'category' : {'name' : undefined},
    'email' : undefined,
    'message' : undefined,
    'name' : undefined
  };
  public isLoading: boolean;
  constructor(private injector: Injector) { }

  ngOnInit() {
    const activateRouter =  this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));
    this.getContactList(id);
  }


  public getContactList(id: any) {
    // Inject service
    this.isLoading = true;
    const userListService = this.injector.get(ContactUsListService);
    const router = this.injector.get(Router);
    const toaster = this.injector.get(ToastrService);

    // Call API
    userListService.getContactUsList(false , id).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0 ) {
          this.isLoading = false;

          if (Object.prototype.toString.call(response['data']['result'][0] === '[object Object]')) {
            this.fetchedContactInfo = response['data']['result'][0];
          }
        } else {
          this.isLoading = false;
          toaster.error('Contact not found', 'error');
          router.navigate(['/contact-us/contact-us-list']);
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        router.navigate(['/contact-us/contact-us-list']);
        this.isLoading = false;
      }
    );
}

}
