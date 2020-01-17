import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerDetailsComponent } from './home-banner-details.component';

describe('FaqDetailsComponent', () => {
  let component: HomeBannerDetailsComponent;
  let fixture: ComponentFixture<HomeBannerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBannerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
