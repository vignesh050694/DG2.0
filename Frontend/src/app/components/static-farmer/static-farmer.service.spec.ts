/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaticFarmerService } from './static-farmer.service';

describe('Service: StaticFarmer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticFarmerService]
    });
  });

  it('should ...', inject([StaticFarmerService], (service: StaticFarmerService) => {
    expect(service).toBeTruthy();
  }));
});
