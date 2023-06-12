/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaticSowingService } from './static-sowing.service';

describe('Service: StaticSowing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticSowingService]
    });
  });

  it('should ...', inject([StaticSowingService], (service: StaticSowingService) => {
    expect(service).toBeTruthy();
  }));
});
