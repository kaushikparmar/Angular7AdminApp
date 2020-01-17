// Custom Component Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpIntercepter } from '../http-handler/http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from '@ngx-progressbar/core';
import { CookieModule } from '@ngx-toolkit/cookie';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Custom Component Imports
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './../common/modules/shared.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { PressModule } from './press/press.module';
import { CommonService } from 'src/common/services/common.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppService } from './app.service';
import { ContactUsModule} from './contact-us/contact-us.module';
import { FaqModule } from './faq/faq.module';
import {TopicsModule} from './topics/topics.module';
import {BreedModule} from './breed/breed.module';
import {RewardModule} from './rewards/reward.module';
import { LostFoundModule } from './lost-found/lost-found.module';
import {CustomAdModule} from './custom-ads/custom-ads.module';
import { BookingServiceModule } from './booking-service/booking-service.module';
import { CmsPagesModule } from './cms-pages/cms-pages.module';
import { HomeBannerModule } from './home-banner/home-banner.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { ManageCommissionModule } from './manage-commission/manage-commission.module';
import { MyPetsModule } from './my-pets/my-pets.module';
import { ReviewsRatingsModule } from './reviews-ratings/reviews-ratings.module';

import { ManageCancellationModule} from './manage-cancellation/manage-cancellation.module';
import { NotificationModule } from './notification/notification.module';
import { InappropriateModule } from './inappropriate/inappropriate.module';

@NgModule({
   declarations: [
      AppComponent,
      DashboardComponent,
      PageNotFoundComponent
   ],
   imports: [
      BrowserModule,
      TopicsModule,
      // ChartsModule,
      RewardModule,
      HttpClientModule,
      BreedModule,
      BrowserAnimationsModule,
      NgbModule.forRoot(),
      CookieModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: false,
        newestOnTop: true,
        tapToDismiss: true
      }),
      NgProgressModule.forRoot({
        direction: 'ltr+',
        color: '#c8ca35',
        thick: true,
        speed: 200,
        trickleSpeed: 300,
        spinner: false,
        meteor: true,
        ease: 'linear'
      }),
      SharedModule,
      AuthModule,
      UserModule,
      BlogModule,
      PressModule,
      ReviewsRatingsModule,
      ContactUsModule,
      FaqModule,
      CustomAdModule,
      BookingServiceModule,
      CmsPagesModule,
      HomeBannerModule,
      EmailTemplateModule,
      LostFoundModule,
      InappropriateModule,
      ManageCommissionModule,
      ManageCancellationModule,
      NotificationModule,
      MyPetsModule,
      NgxChartsModule,
      AppRoutingModule,

    ],
   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepter,
      multi: true
    },
    AppService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
