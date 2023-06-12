/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaticFarmService } from './static-farm.service';

describe('Service: StaticFarm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticFarmService]
    });
  });

  it('should ...', inject([StaticFarmService], (service: StaticFarmService) => {
    expect(service).toBeTruthy();
  }));
});
