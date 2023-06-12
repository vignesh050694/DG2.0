/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CropHarvestService } from './crop-harvest.service';

describe('Service: CropHarvest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CropHarvestService]
    });
  });

  it('should ...', inject([CropHarvestService], (service: CropHarvestService) => {
    expect(service).toBeTruthy();
  }));
});
