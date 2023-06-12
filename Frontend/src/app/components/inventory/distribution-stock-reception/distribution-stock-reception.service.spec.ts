/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DistributionStockReceptionService } from './distribution-stock-reception.service';

describe('Service: DistributionStockReception', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributionStockReceptionService]
    });
  });

  it('should ...', inject([DistributionStockReceptionService], (service: DistributionStockReceptionService) => {
    expect(service).toBeTruthy();
  }));
});
