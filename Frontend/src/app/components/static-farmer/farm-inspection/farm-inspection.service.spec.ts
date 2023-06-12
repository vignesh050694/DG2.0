/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FarmInspectionService } from './farm-inspection.service';

describe('Service: FarmInspection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmInspectionService]
    });
  });

  it('should ...', inject([FarmInspectionService], (service: FarmInspectionService) => {
    expect(service).toBeTruthy();
  }));
});
