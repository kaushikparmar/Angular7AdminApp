/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PressListComponent } from './press-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { PressRoutingModule } from '../press-routing.module';

xdescribe('UserListComponent', () => {
  let component: PressListComponent;
  let fixture: ComponentFixture<PressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressListComponent ],
      imports: [
        PressRoutingModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
