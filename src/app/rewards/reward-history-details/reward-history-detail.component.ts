import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { RewardHistoryListService } from '../reward-history-list/reward-history-list.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pb-reward-history-detail',
  templateUrl: './reward-history-detail.component.html',
  styleUrls: ['./reward-history-detail.component.scss']
})
export class RewardHistoryDetailsComponent implements OnInit {
  public fetchedRewardInfo = {
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
    const rewardHistoryListService = this.injector.get(RewardHistoryListService);
    const router = this.injector.get(Router);
    const toaster = this.injector.get(ToastrService);

    // Call API
    rewardHistoryListService.getRewards(false , id).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0 ) {
          this.isLoading = false;

          if (Object.prototype.toString.call(response['data']['result'][0] === '[object Object]')) {
            this.fetchedRewardInfo = response['data']['result'][0];
          }
        } else {
          this.isLoading = false;
        //   toaster.error('Contact not found', 'error');
        //   router.navigate(['/reward-history/list']);
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        router.navigate(['/reward-history/list']);
        this.isLoading = false;
      }
    );
}

}
