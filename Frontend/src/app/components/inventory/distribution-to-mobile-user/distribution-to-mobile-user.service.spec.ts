/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DistributionToMobileUserService } from './distribution-to-mobile-user.service';

describe('Service: DistributionToMobileUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributionToMobileUserService]
    });
  });

  it('should ...', inject([DistributionToMobileUserService], (service: DistributionToMobileUserService) => {
    expect(service).toBeTruthy();
  }));
});
