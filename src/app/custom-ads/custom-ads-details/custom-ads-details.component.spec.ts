import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAdsDetailsComponent } from './custom-ads-details.component';

describe('FaqDetailsComponent', () => {
  let component: CustomAdsDetailsComponent;
  let fixture: ComponentFixture<CustomAdsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAdsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
