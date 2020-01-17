import { TestBed, async } from '@angular/core/testing';
import { LoginService } from './login.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { TestCases } from './test.cases';
import { SharedModule } from 'src/common/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Login Test', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        SharedModule
      ],
      providers: [
        LoginService
      ]
    }).compileComponents();
  }));

  it('should create the Login Component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Login'`, () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Login');
  });

  for (const test of TestCases.loginTestCases) {
    it('should have email ' + test.email + ' & password ' + test.password, async(() => {
      // Create the component
      const fixture = TestBed.createComponent(LoginComponent);
      // Detech changes
      fixture.detectChanges();
      // Hold Component Instance
      const app = fixture.debugElement.componentInstance;
      // Get app service instance
      const loginService = fixture.debugElement.injector.get(LoginService);
      // Get data for username and password
      app.username = test.email;
      app.password = test.password;
      // Call login from service
      loginService.login(app.username, app.password).subscribe(
        (response) => {
        // Expected Result In Case Of Success
        expect(response.code).toBe(test.expect);
        },
        (error) => {
          // console.log(error);
          // Expected Result In Case Of Failure
          expect(error.code).toBe(test.expect);
        }
      );
    }));
  }

  // it('should have username "brainvire" & password "systems"', async(() => {
  //   // Create the component
  //   const fixture = TestBed.createComponent(AppComponent);
  //   // Detech changes
  //   fixture.detectChanges();
  //   // Hold Component Instance
  //   const app = fixture.debugElement.componentInstance;
  //   // Get app service instance
  //   const appService = fixture.debugElement.injector.get(AppService);
  //   // Get data for username and password
  //   app.username = DATA[0].username;
  //   app.password = DATA[0].password;
  //   // Call login from service
  //   appService.login(app.username, app.password).subscribe(response => {
  //     // Expected Result
  //     expect(response.status).toBe(true);
  //   });
  // }));

  // it('should have username "Brainvire" & password "systems"', async(() => {
  //   // Create the component
  //   const fixture = TestBed.createComponent(AppComponent);
  //   // Detech changes
  //   fixture.detectChanges();
  //   // Hold Component Instance
  //   const app = fixture.debugElement.componentInstance;
  //   // Get app service instance
  //   const appService = fixture.debugElement.injector.get(AppService);
  //   // Get data for username and password
  //   app.username = DATA[1].username;
  //   app.password = DATA[1].password;
  //   // Call login from service
  //   appService.login(app.username, app.password).subscribe(response => {
  //     // Expected Result
  //     expect(response.status).toBe(true);
  //   });
  // }));


});
