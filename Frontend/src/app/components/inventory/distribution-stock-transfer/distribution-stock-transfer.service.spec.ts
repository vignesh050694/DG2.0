/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DistributionStockTransferService } from './distribution-stock-transfer.service';

describe('Service: DistributionStockTransfer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributionStockTransferService]
    });
  });

  it('should ...', inject([DistributionStockTransferService], (service: DistributionStockTransferService) => {
    expect(service).toBeTruthy();
  }));
});
