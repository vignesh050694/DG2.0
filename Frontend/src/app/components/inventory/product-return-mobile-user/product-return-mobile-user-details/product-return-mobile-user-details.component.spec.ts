/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductReturnMobileUserDetailsComponent } from './product-return-mobile-user-details.component';

describe('ProductReturnMobileUserDetailsComponent', () => {
  let component: ProductReturnMobileUserDetailsComponent;
  let fixture: ComponentFixture<ProductReturnMobileUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReturnMobileUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReturnMobileUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
