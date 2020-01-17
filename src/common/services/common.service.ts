// Angular Library Imports
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommonService {

    // To hold system data and configuration
    private systemPreferences: any = {
    };
    // Observable current  Page Info Object Source
    public event: any = {};
    // Observable current  Page Info Object Observable
    public eventObservable = new Subject<any>();
    public eventObservableForNotification = new Subject<any>();
    public changeEmitted: any;

    constructor() {
        this.changeEmitted = this.eventObservableForNotification.asObservable();
    }

    /**
     * @param key : Getter returns user data as passed key in argument
     */
    public get(key: string): any {
        return this.systemPreferences[key];
    }

    /**
     * @param key : Removed user data as passed key in argument
     */
    public remove(key: string, flag?: boolean): any {
        delete this.systemPreferences[key];
    }

    /**
     * @param key : Property nane sets user data with a named key as passed key in argument
     * @param data : Setter sets user data on passed key in argument
     */
    public set(key: string, data: any, flag?: boolean): void {
        this.systemPreferences[key] = data;
    }


    /**
     * @param key : Property name sets user data with a named key as passed key in argument
     * @param data : Setter sets user data on passed key in argument
     */
    public setEvent(event: string, data: any) {
        this.event = {'event': event, 'data': data};
        this.eventObservable.next(this.event);
    }

    /**
     * @param systemPreferences : Property sets system preferences
     */
    public setUserPreferenceFromStorage(systemPreferences: any): void {
        this.systemPreferences = systemPreferences;
    }

    public notificationReadAction() {
        this.eventObservableForNotification.next();
    }

/**
 * Converting Date into YYYY-MM-DD format string
 * @param dates Provide date to be converted
 */
  public dateCoversion(dates): string {
    // STORE WITH DATE FORMAT
    const tempDate = new Date(dates);
    // GET DATE
    const getDate = tempDate.getDate();
    // GET MONTH
    const getMonth = tempDate.getMonth() + 1;
    // GET YEAR
    const getYear = tempDate.getFullYear();
    // PREPARE STRING FOR FINAL DATE
    let finalDate: string = '';
    // PREPARE STRING FOR FINAL MONTH
    let finalMonth: string = '';
    // APPEND 0 IF LESS THAN 10 TO MAKE IT OF TWO DIGIT
    if (getDate < 10) {
      finalDate = `0${getDate}`;
    } else {
      finalDate = `${getDate}`;
    }
    if (getMonth < 10) {
      finalMonth = `0${getMonth}`;
    } else {
      finalMonth = `${getMonth}`;
    }
    // RETURN FORMATTED DATE
    return `${getYear}-${finalMonth}-${finalDate}`;
  }

}
