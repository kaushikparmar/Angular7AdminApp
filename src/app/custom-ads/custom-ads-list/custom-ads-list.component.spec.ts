import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAdsListComponent } from './custom-ads-list.component';

describe('FaqListComponent', () => {
  let component: CustomAdsListComponent;
  let fixture: ComponentFixture<CustomAdsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAdsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
