/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductReturnMobileUserService } from './product-return-mobile-user.service';

describe('Service: ProductReturnMobileUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductReturnMobileUserService]
    });
  });

  it('should ...', inject([ProductReturnMobileUserService], (service: ProductReturnMobileUserService) => {
    expect(service).toBeTruthy();
  }));
});
