/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FarmerMapService } from './farmer-map.service';

describe('Service: FarmerMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmerMapService]
    });
  });

  it('should ...', inject([FarmerMapService], (service: FarmerMapService) => {
    expect(service).toBeTruthy();
  }));
});
