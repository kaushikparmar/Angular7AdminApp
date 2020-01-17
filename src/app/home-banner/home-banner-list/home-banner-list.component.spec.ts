import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerListComponent } from './home-banner-list.component';

describe('FaqListComponent', () => {
  let component: HomeBannerListComponent;
  let fixture: ComponentFixture<HomeBannerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBannerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
