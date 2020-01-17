import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCommissionComponent } from './set-commission.component';

describe('SetCommissionComponent', () => {
  let component: SetCommissionComponent;
  let fixture: ComponentFixture<SetCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
