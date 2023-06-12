/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FarmService } from './farm.service';

describe('Service: Farm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmService]
    });
  });

  it('should ...', inject([FarmService], (service: FarmService) => {
    expect(service).toBeTruthy();
  }));
});
