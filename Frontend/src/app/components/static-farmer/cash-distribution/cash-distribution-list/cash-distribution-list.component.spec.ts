/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CashDistributionListComponent } from './cash-distribution-list.component';

describe('CashDistributionListComponent', () => {
  let component: CashDistributionListComponent;
  let fixture: ComponentFixture<CashDistributionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDistributionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDistributionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
