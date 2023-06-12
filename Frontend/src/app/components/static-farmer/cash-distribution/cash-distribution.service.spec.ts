/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CashDistributionService } from './cash-distribution.service';

describe('Service: CashDistribution', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashDistributionService]
    });
  });

  it('should ...', inject([CashDistributionService], (service: CashDistributionService) => {
    expect(service).toBeTruthy();
  }));
});
