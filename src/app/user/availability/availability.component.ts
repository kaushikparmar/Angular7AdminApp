import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Input() serviceAvailabilities: any[];

  constructor() { }

  public weekDaysInfo: any = [
    {
      'dayName': 'Sun',
      'index': '0'
    },
    {
      'dayName': 'Mon',
      'index': '1'
    },
    {
      'dayName': 'Tue',
      'index': '2'
    },
    {
      'dayName': 'Wed',
      'index': '3'
    },
    {
      'dayName': 'Thu',
      'index': '4'
    },
    {
      'dayName': 'Fri',
      'index': '5'
    },
    {
      'dayName': 'Sat',
      'index': '6'
    }
  ];

  ngOnInit() {
    /** Converting days indexes to there name */
    const dayIndexs = this.serviceAvailabilities[0].days.split(',');
    for (let i = 0; i < this.weekDaysInfo.length; i++) {
      for (let j = 0; j < dayIndexs.length; j++) {
        if (this.weekDaysInfo[i].index === dayIndexs[j]) {
          dayIndexs[j] = this.weekDaysInfo[i].dayName;
          break;
        }
      }
    }
    this.serviceAvailabilities[0].days = dayIndexs.join(', ');
  }

}
