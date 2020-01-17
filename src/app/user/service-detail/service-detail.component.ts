import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  @Input() serviceDetails: any = [];

  constructor() { }

  ngOnInit() {
    this.serviceDetails.forEach(serviceElement => {
      serviceElement.isMultipleAnswer = false;
    });
    /** handle multianswer answers */
    if (this.serviceDetails[1]) {
      if (this.serviceDetails[1].answer) {
        this.serviceDetails[1].answer = JSON.parse(this.serviceDetails[1].answer);
        let linkUrl = '';
        for (const link of this.serviceDetails[1].answer) {
            if (linkUrl !== '') {
              linkUrl = `${link} , ${linkUrl}`;
            } else {
              linkUrl = `${link}`;
            }
        }
        this.serviceDetails[1].answer = linkUrl;
      }
    }
    if (this.serviceDetails[7]) {
      if (this.serviceDetails[7].answer ) {
        this.serviceDetails[7].answer = JSON.parse(this.serviceDetails[7].answer);
         let linkUrl = '';
        for (const link of this.serviceDetails[7].answer) {
            if (linkUrl !== '') {
              linkUrl = `${link} , ${linkUrl}`;
            } else {
              linkUrl = `${link}`;
            }
        }
        this.serviceDetails[7].answer = linkUrl;
      }
    }
  }

}
