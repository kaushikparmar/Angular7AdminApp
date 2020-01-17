import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommissionListComponent } from './manage-commission-list.component';

describe('ManageCommissionListComponent', () => {
  let component: ManageCommissionListComponent;
  let fixture: ComponentFixture<ManageCommissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCommissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
