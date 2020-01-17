import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPagesDetailsComponent } from './cms-pages-details.component';

describe('CmsDetailsComponent', () => {
  let component: CmsPagesDetailsComponent;
  let fixture: ComponentFixture<CmsPagesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsPagesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsPagesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
