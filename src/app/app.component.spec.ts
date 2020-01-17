import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { CookieModule } from '@ngx-toolkit/cookie';
import { NgProgressModule } from '@ngx-progressbar/core';
import { CommonService } from 'src/common/services/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CookieModule.forRoot(),
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
        RouterTestingModule,
        SharedModule
      ],
      declarations: [AppComponent],
      providers: [CommonService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Admin');
  });
});
