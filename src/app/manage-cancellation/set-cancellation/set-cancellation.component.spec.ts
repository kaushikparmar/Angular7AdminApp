import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCancellationComponent } from './set-cancellation.component';

describe('SetCancellationComponent', () => {
  let component: SetCancellationComponent;
  let fixture: ComponentFixture<SetCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
