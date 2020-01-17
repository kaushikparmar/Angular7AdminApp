import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Injector } from '@angular/core';
import { TopicDetailService } from './topics-details.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FaqDetailService } from '../../faq/faq-details/faq-details.service';
import { TopicsListService } from '../topics-list/topics-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'pb-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsComponent implements OnInit {
  public fetchTopicsData: any = [];
  public fetchSubTopicsData: any = [];
  public isSubmited: boolean = false;
  public topicsData: any = [];
  @ViewChild('addtopicForm') public addtopicForm: NgForm;
  @ViewChild('addsubtopicForm') public addsubtopicForm: NgForm;

  public isLoading: boolean;
  public path: any;
  constructor(
    private injector: Injector,
    private activatedRoutes: ActivatedRoute
  ) {
  }
  ngOnInit() {
    const activateRouter = this.injector.get(ActivatedRoute);
    const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

    this.path = this.activatedRoutes.url['value'][0]['path'];

    if (this.path === 'view' || this.path === 'edit') {
      this.topicDetails(id);
    }
    this.fetchTopics();
  }

  /**
   * Fetch parent Topics
   */
  public fetchTopics() {

    // Inject service
    const faqListservice = this.injector.get(FaqDetailService);
    const progress = this.injector.get(NgProgress);
    this.fetchTopicsData = [];
    // Call API
    progress.start();
    faqListservice.fetchParentTopics().subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.fetchTopicsData = response['data'];
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  /**
   *
   * @param isValid Form Valid
   * Add Topic
   */
  public crudTopic(isValid) {
    this.isSubmited = true;
    if (this.isSubmited === true && isValid.valid === true ) {
      if (this.path === 'add') {
        const activateRouter = this.injector.get(ActivatedRoute);
        const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));
        const params = {};

        if (this.topicsData.topics && Object.prototype.toString.call(this.topicsData.topics) === '[object Number]') {
          params['topicData'] = [{
            'name': this.topicsData.categoryName,
            'parent_id': Number(this.topicsData.topics)
          }];

        } else {
          params['topicData'] = [{
            'name': this.topicsData.categoryName
          }];
        }


        const topicDetailService = this.injector.get(TopicDetailService);
        const progress = this.injector.get(NgProgress);

        topicDetailService.addTopics(params).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              const router = this.injector.get(Router);
              const toaster = this.injector.get(ToastrService);
              toaster.success('Topic added successfully' , 'Success');

              router.navigate(['/topics/list']);
            }
            progress.complete();
          },
          (error: HttpResponse<any>) => {
            console.error(error);
            progress.complete();
          }
        );
      } else {
            this.editTopic(isValid.valid);
      }
    }

  }

  public addTopic(isValid) {
    this.isSubmited = true;
    if (this.isSubmited === true && isValid.valid === true ) {
      if (this.path === 'add') {
        const activateRouter = this.injector.get(ActivatedRoute);
        const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));
        const params = {};

        if (this.topicsData.topics && Object.prototype.toString.call(this.topicsData.topics) === '[object Number]') {
          params['topicData'] = [{
            'name': this.topicsData.categoryName,
            'parent_id': Number(this.topicsData.topics)
          }];

        } else {
          params['topicData'] = [{
            'name': this.topicsData.categoryName
          }];
        }


        const topicDetailService = this.injector.get(TopicDetailService);
        const progress = this.injector.get(NgProgress);

        topicDetailService.addTopics(params).subscribe(
          (response: HttpResponse<any>) => {
            if (response['code'] === 200) {
              const router = this.injector.get(Router);
              const toaster = this.injector.get(ToastrService);
              toaster.success('Topic added successfully' , 'Success');

              router.navigate(['/topics/list']);
            }
            progress.complete();
          },
          (error: HttpResponse<any>) => {
            console.error(error);
            progress.complete();
          }
        );
      }
    }

  }

  /**
   *
   * @param id Topic Id
   * get Topic based detail
   */
  public topicDetails(id) {
    // Inject service
    this.isLoading  = true;
    const faqListservice = this.injector.get(TopicDetailService);
    const progress = this.injector.get(NgProgress);
    const params = {
      id: id
    };
    // Call API
    progress.start();
    faqListservice.fetchTopicDetail(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200 && response['data']['totalRecords'] !== 0 ) {
          this.isLoading  = false;
          if (Object.prototype.toString.call(response['data']['result'][0]) === '[object Object]') {
            if (Object.prototype.toString.call(response['data']['result'][0]['topics_ibfk_1']) === '[object Object]') {
              this.topicsData.topics = response['data']['result'][0].parent_id;
              this.topicsData.subTopic = response['data']['result'][0]['name'];
              this.topicsData.status = response['data']['result'][0]['status'];
            } else {
              this.topicsData.parentTopic = response['data']['result'][0]['name'];
              this.topicsData.status = response['data']['result'][0]['status'];
            }
          }
        } else {
          this.isLoading  = false;
          const router = this.injector.get(Router);
          const toaster = this.injector.get(ToastrService);
          router.navigate(['topics/list']);
          toaster.error('Topic not found' , 'ERROR');
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  public tabChange() {
    this.isSubmited = false;
    this.addtopicForm.reset();
    this.addsubtopicForm.reset();
  }
  public editTopic(validForm) {
    this.isSubmited = true;

    if (validForm === true && this.path === 'edit') {
      const params = {};

      const activateRouter = this.injector.get(ActivatedRoute);
      const id: Number = Number(activateRouter.snapshot.paramMap.get('id'));

      const topicDetailService = this.injector.get(TopicDetailService);
      const progress = this.injector.get(NgProgress);

      params['updateTopics'] = [
        {
          'id': id,
          'status' : this.topicsData.status
        }
      ];

      if (Object.prototype.toString.call(this.topicsData.topics) === '[object Number]') {
        params['updateTopics'][0]['parent_id'] = this.topicsData.topics;
        params['updateTopics'][0]['name'] = this.topicsData.subTopic;
      } else {
        params['updateTopics'][0]['name'] = this.topicsData.parentTopic;
      }


      topicDetailService.editTopics(params).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            const router = this.injector.get(Router);
            const toaster = this.injector.get(ToastrService);
            toaster.success('Topic updated successfully' , 'Success');
            router.navigate(['/topics/list']);
          }
          progress.complete();
        },
        (error: HttpResponse<any>) => {
          console.error(error);
          progress.complete();
        }
      );
    }
  }
}
