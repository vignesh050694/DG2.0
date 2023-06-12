/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DistributionToFarmerService } from './distribution-to-farmer.service';

describe('Service: DistributionToFarmer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributionToFarmerService]
    });
  });

  it('should ...', inject([DistributionToFarmerService], (service: DistributionToFarmerService) => {
    expect(service).toBeTruthy();
  }));
});
