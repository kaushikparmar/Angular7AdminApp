import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCancellationListComponent } from './manage-cancellation-list.component';

describe('ManageCancellationListComponent', () => {
  let component: ManageCancellationListComponent;
  let fixture: ComponentFixture<ManageCancellationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCancellationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCancellationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
