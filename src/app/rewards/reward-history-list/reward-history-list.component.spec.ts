import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardHistoryListComponent } from './reward-list.component';

describe('RewardHistoryListComponent', () => {
  let component: RewardHistoryListComponent;
  let fixture: ComponentFixture<RewardHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
