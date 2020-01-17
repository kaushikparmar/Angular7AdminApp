import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPagesListComponent } from './cms-pages-list.component';

describe('FaqListComponent', () => {
  let component: CmsPagesListComponent;
  let fixture: ComponentFixture<CmsPagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsPagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsPagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
