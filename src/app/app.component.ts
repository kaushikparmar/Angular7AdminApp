import { Component, Injector, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CookieService } from '@ngx-toolkit/cookie';
import { CommonService } from 'src/common/services/common.service';
import { AppService } from './app.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '204px',
        // opacity: 1
      })),
      state('closed', style({
        width: '54px',
        // opacity: 1
      })),
      transition('* => closed', [
        animate('0.2s')
      ]),
      transition('* => open', [
        animate('0.2s')
      ]),
    ]),

    trigger('panelClose', [
      // ...
      state('open', style({
        // marginLeft: '204px',
        // opacity: 1
      })),
      state('closed', style({
        // marginLeft: '65px',
        // opacity: 1
      })),
      transition('* => closed', [
        animate('0.2s')
      ]),
      transition('* => open', [
        animate('0.2s')
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, AfterViewInit {
  /**
   * Public Data Members
   */
  public currentRoute: any = '/login';
  public isSideNavOpened: boolean = true;
  public isRemoveLabel: boolean = false;
  public notificationCount: number;
  public notificationCountVisibility: Boolean;
  public notificationData: any = [];
  public submenuStatus: boolean = true;
  public isNotificationClicked: boolean = false;
  public menu: any = [
    {
      'menu_name': 'Dashboard',
      'link': '/dashboard',
      'icon': 'assets/svg/dashboard.svg',
      'icon_active': 'assets/svg/dashboard_active.svg'
    },
    {
      'menu_name': 'User',
      'link': '/user',
      'icon': 'assets/svg/user.svg',
      'icon_active': 'assets/svg/user_active.svg'
    },
    {
      'menu_name': 'CMS',
      'icon': 'assets/svg/cms.svg',
      'icon_active': 'assets/svg/cms_active.svg',
      'menu_item_list': [
        {
          'menu_item_name': 'Blog',
          'link': '/blog/blog-list',
        },
        {
          'menu_item_name': 'Help',
          'link': '/faq/list',
        },
        {
          'menu_item_name': 'Press',
          'link': '/press/press-list',
        },
        {
          'menu_item_name': 'Home Banner',
          'link': '/home-banner/list',
        },
        {
          'menu_item_name': 'Home Content',
          'link': '/cms-pages/home-content',
        },
        {
          'menu_item_name': 'Agreement',
          'link': '/cms-pages/list',
        },
      ]
    },
    {
      'menu_name': 'Manage Masters',
      'icon': 'assets/svg/manage.svg',
      'icon_active': 'assets/svg/manage_active.svg',
      'menu_item_list': [
        {
          'menu_item_name': 'Blog Category',
          'link': '/blog-category/blog-category-list',
        },
        {
          'menu_item_name': 'Press Category',
          'link': '/press-category/press-category-list',
        },
        {
          'menu_item_name': 'Help Topics',
          'link': '/topics/list',
        },
        {
          'menu_item_name': 'Breeds',
          'link': '/breed/list',
        },
        {
          'menu_item_name': 'Rewards',
          'link': '/reward/list',
        },
        {
          'menu_item_name': 'Manage Commission',
          'link': '/manage-commission/list',
          // 'icon': 'assets/svg/manage-commison.svg',
          // 'icon_active': 'assets/svg/manage-commison_active.svg',
        },
        {
          'menu_item_name': 'Manage Cancellation',
          'link': '/manage-cancellation/list',
          // 'icon': 'assets/svg/manage-cancellation.svg',
          // 'icon_active': 'assets/svg/manage-cancellation_active.svg',
        },
      ]
    },
    {
      'menu_name': 'Reviews & Ratings',
      'link': '/reviews-ratings/reviews-ratings-list',
      'icon': 'assets/svg/rating.svg',
      'icon_active': 'assets/svg/rating_active.svg'
    },
    {
      'menu_name': 'Contact Management',
      'link': '/contact-us/contact-us-list',
      'icon': 'assets/svg/contact.svg',
      'icon_active': 'assets/svg/contact_active.svg'
    },
    {
      'menu_name': 'Reward History',
      'link': '/reward-history/list',
      'icon': 'assets/svg/reward.svg',
      'icon_active': 'assets/svg/reward_active.svg',
    },
    {
      'menu_name': 'Lost & Found',
      'link': '/lost-and-found/list',
      'icon': 'assets/svg/lost-found.svg',
      'icon_active': 'assets/svg/lost-found_active.svg',
    },
    {
      'menu_name': 'Custom Ads',
      'link': '/custom-ads/list',
      'icon': 'assets/svg/custome-ads.svg',
      'icon_active': 'assets/svg/custome-ads_active.svg',
    },
    {
      'menu_name': 'Manage Pets',
      'link': '/manage-pets/list',
      'icon': 'assets/svg/my-pet.svg',
      'icon_active': 'assets/svg/my-pet_active.svg',
    },
    {
      'menu_name': 'Booking',
      'link': '/booking-service/list',
      'icon': 'assets/svg/booking.svg',
      'icon_active': 'assets/svg/booking_active.svg',
    },
    {
      'menu_name': 'Notification',
      'link': '/notification',
      'icon': 'assets/svg/cms.svg',
      'icon_active': 'assets/svg/cms_active.svg',
    },
    {
      'menu_name': 'Inappropriate',
      'link': '/inappropriate',
      'icon': 'assets/svg/cms.svg',
      'icon_active': 'assets/svg/cms_active.svg',
    },
    {
      'menu_name': 'Account Setting',
      'icon': 'assets/svg/account-setting.svg',
      'icon_active': 'assets/svg/account-setting_active.svg',
      'menu_item_list': [
        {
          'menu_item_name': 'Change Password',
          'link': '/change-password',
        }]
    }



  ];

  // public links: Array<any> = [
  //   {
  //     link: 'Dashboard',
  //     routerLink: '/dashboard',
  //     icon: 'dashboard'
  //   },
  //   {
  //     link: 'User',
  //     routerLink: '/user',
  //     icon: 'perm_identity',
  //     sub_menu: [
  //       {
  //         link: 'Service Provider',
  //         routerLink: 'service-provider',
  //         icon: ''
  //       },
  //       {
  //         link: 'Pet Owner',
  //         routerLink: 'pet-owner',
  //         icon: ''
  //       }
  //     ]
  //   },
  //   {
  //     link: 'Blog',
  //     routerLink: '/blog',
  //     icon: 'perm_identity',
  //     sub_menu: [
  //       {
  //         link: 'Add Blog',
  //         routerLink: 'add-blog',
  //         icon: ''
  //       },
  //       {
  //         link: 'Blog List',
  //         routerLink: 'blog-list',
  //         icon: ''
  //       }
  //     ]
  //   },
  //   {
  //     link: 'FAQ',
  //     routerLink: '/faq',
  //     icon: 'perm_identity',
  //     sub_menu: [
  //       {
  //         link: 'Faq list',
  //         routerLink: 'faq-list',
  //         icon: ''
  //       }
  //     ]
  //   },
  //   {
  //     link: 'Topics',
  //     routerLink: '/topics',
  //     icon: 'perm_identity',
  //     sub_menu: [
  //       {
  //         link: 'Topics list',
  //         routerLink: 'topics-list',
  //         icon: ''
  //       }
  //     ]
  //   },
  //   {
  //     link: 'Contact Us',
  //     routerLink: '/contact-us',
  //     icon: 'perm_identity',
  //     sub_menu: [
  //       {
  //         link: 'Contact us list',
  //         routerLink: 'contact-us/contact-us-list',
  //         icon: ''
  //       }
  //     ]
  //   },
  //   {
  //     link: 'Booking',
  //     routerLink: '/first',
  //     icon: 'payment'
  //   },
  //   {
  //     link: 'Transaction History',
  //     routerLink: '/second',
  //     icon: 'history'
  //   },
  //   {
  //     link: 'Review & Rating',
  //     routerLink: '/third',
  //     icon: 'rate_review'
  //   },
  //   {
  //     link: 'Awards',
  //     routerLink: '/forth',
  //     icon: 'pages',
  //     // submenu: ['Configure Reward Points', 'Reward Point History', 'Redeem Point History']
  //   },
  //   {
  //     link: 'Lost & Found',
  //     routerLink: '/fifth',
  //     icon: 'pets'
  //   },
  //   {
  //     link: 'In-Appropriate Messages',
  //     routerLink: '/sixth',
  //     icon: 'message'
  //   },
  //   {
  //     link: 'Custom Ads',
  //     routerLink: '/seventh',
  //     icon: 'new_releases'
  //   },
  //   {
  //     link: 'Master Management',
  //     routerLink: '/eighth',
  //     icon: 'donut_small',
  //     submenu: [
  //       {
  //         'icon': 'donut_small',
  //         'text': 'Blog Category',
  //         routerLink: '/blog/blog-category-list',
  //       },
  //       {
  //         'icon': 'donut_small',
  //         'text': 'Press Category',
  //         routerLink: 'service-provider',
  //       },
  //       {
  //         'icon': 'donut_small',
  //         'text': 'Help',
  //         routerLink: 'service-provider',
  //       },
  //       {
  //         'icon': 'donut_small',
  //         'text': 'Messages',
  //         routerLink: 'service-provider',
  //       },
  //       {
  //         'icon': 'donut_small',
  //         'text': 'Email Content',
  //         routerLink: 'service-provider',
  //       }
  //     ]
  //   },
  //   {
  //     link: 'CMS',
  //     routerLink: '/ninth',
  //     icon: 'people'
  //   }
  // ];



  constructor(
    private injector: Injector,
    private commonService: CommonService
  ) {
    const router = this.injector.get(Router);
    router.events.subscribe(
      (event: any) => {
        // console.log(this.router.url);
        if (event instanceof NavigationEnd) {

          this.currentRoute = router.url;
          // Inject service
          const cookie = this.injector.get(CookieService);
          const authKey = cookie.getItem('session');
          if (!authKey && router.url !== '/login') {
            // Redirect to login URL
            // window.location.href = environment.baseUrl;
            router.navigate(['/login']);
          } else if (authKey && router.url === '/login') {
            router.navigate(['/dashboard']);
          }
        }
      }
    );
    this.commonService.changeEmitted.subscribe(
      text => {
          this.adminNotification();
      });
  }

  /**
   * Toggle SubMenu
   * @param data Check if menu has sub-menu
   */
  public toggleSubMenu(data) {
    if (data.hasSubMenu) {
      data.hasSubMenu = false;
    } else {
      data.hasSubMenu = true;
    }
    for (const obj of this.menu) {
      if (obj.menu_item_name !== data.menu_item_name) {
        obj['hasSubMenu'] = false;
      }
    }
  }


  public calculateRoute(): void {
    const router = this.injector.get(Router);
    const activateRouter = this.injector.get(ActivatedRoute);
    for (const obj of this.menu) {
      if (obj.menu_item_list !== undefined) {
        for (const innerMenu of obj.menu_item_list) {
          // console.log(router.url,  innerMenu.link);
          if ((innerMenu.link === router.url) || (innerMenu.link.split('/')[1] === router.url.split('/')[1])) {
            obj['hasSubMenu'] = true;
            obj['isActive'] = true;
            // this.currentUserPath = innerMenu.link;
            break;
          } else {
            obj['isActive'] = false;
            obj['hasSubMenu'] = false;
          }
        }
      } else {
        if (obj.link && obj.link === router.url && obj.link.split('/')[1] === router.url.split('/')[1]) {
          obj['isActive'] = true;
        }
        if (obj.link && obj.link !== router.url) {
          obj['isActive'] = false;
        }
      }
    }
  }

  public toggleSidebar(): void {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  /**
   * Activate/Deactivvate A User
   */
  public adminNotification() {
    // Inject service
    const appService = this.injector.get(AppService);
    const progress = this.injector.get(NgProgress);
    // Call API
    progress.start();
    appService.adminNotification(false).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          // Notification Data
          this.notificationCount = response['data']['count'];
          this.notificationCountVisibility = false;
          if (response['data']['result'].length) {
            this.notificationCountVisibility = response['data']['result'][0].show;
            this.notificationData = [];
            response['data']['result'].forEach((element, index) => {
              if (index < 5) {
                this.notificationData.push(element)
              }
            });
          }
          // this.notificationData = response['data']['result'];
          // this.notificationCountVisibility = response['data']['result'][0].show;
          // this.notificationCountVisibility = false;
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  public showCount() {
    // const params = {};
    // params['show'] = false;
    // const toastrService = this.injector.get(ToastrService);
    this.isNotificationClicked = true;
    if (this.notificationData.length && this.notificationData[0].show === true) {
      const appService = this.injector.get(AppService);
      appService.showCount({ 'show': false }).subscribe(
        (response: HttpResponse<any>) => {
          if (response['code'] === 200) {
            this.adminNotification();
          }
        },
        (error: HttpResponse<any>) => {
          console.error(error);
        }
      );
    }
  }


  /**
   * Frontend Logout
   */
  private frontendLogout(): void {
    // Inject service
    const cookie = this.injector.get(CookieService);
    cookie.clear();
    // Inject service
    const router = this.injector.get(Router);
    router.navigate(['/login']);
  }

  public ngOnInit(): void {
    this.calculateRoute();

    // Inject service
    const cookie = this.injector.get(CookieService);
    const commonService = this.injector.get(CommonService);
    const authKey = cookie.getItem('session');

    if (authKey) {
      commonService.set('session', authKey);
      this.adminNotification();
    }
    // Throw on login screen when token is unauthorized
    // And clear the session or logout from frontend side
    commonService.eventObservable.subscribe(
      (data) => {
        if (data.event === 'isSessionExpired') {
          this.frontendLogout();
        }
        if (data.event === 'getNotifications') {
          this.adminNotification();
        }
      }
    );
    const router = this.injector.get(Router);

    router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this.currentRoute = router.url;
            // trick the Router into believing it's last link wasn't previously loaded
            router.navigated = false;
            window.scrollTo(0, 0);
          }, 500);
          this.calculateRoute();
        }
      }
    );
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  public onNotificationClick(user) {
    // Inject service
    const appService = this.injector.get(AppService);
    const progress = this.injector.get(NgProgress);
    const params = {
      id: user.id,
      is_read: true
    };
    // Call API
    progress.start();
    appService.updateNotification(params).subscribe(
      (response: HttpResponse<any>) => {
        if (response['code'] === 200) {
          this.navigate(user);
        }
        progress.complete();
      },
      (error: HttpResponse<any>) => {
        console.error(error);
        progress.complete();
      }
    );
  }

  public navigate(user: any): void {
    const router = this.injector.get(Router);
    if (user.activity_type === 'user') {
      router.navigate(['/user', user.source_id]);
    } else if (user.activity_type === 'lost_found') {
      router.navigate(['lost-and-found/details', user.source_id]);
    } else if (user.activity_type === 'enquiry') {
      router.navigate(['contact-us/view', user.source_id]);
    } else if (user.activity_type === 'rewards') {
      router.navigate(['reward-history/view', user.source_id]);
    } else if (user.activity_type === 'booking') {
      router.navigate(['booking-service/details', user.source_id]);
    }
  }


}
