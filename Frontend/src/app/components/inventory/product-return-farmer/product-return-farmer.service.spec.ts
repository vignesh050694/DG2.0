/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductReturnFarmerService } from './product-return-farmer.service';

describe('Service: ProductReturnFarmer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductReturnFarmerService]
    });
  });

  it('should ...', inject([ProductReturnFarmerService], (service: ProductReturnFarmerService) => {
    expect(service).toBeTruthy();
  }));
});
