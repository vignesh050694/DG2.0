/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaticLocationService } from './static-location.service';

describe('Service: StaticLocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticLocationService]
    });
  });

  it('should ...', inject([StaticLocationService], (service: StaticLocationService) => {
    expect(service).toBeTruthy();
  }));
});
