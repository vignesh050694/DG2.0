/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FarmerFormService } from './farmer-form.service';

describe('Service: FarmerForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmerFormService]
    });
  });

  it('should ...', inject([FarmerFormService], (service: FarmerFormService) => {
    expect(service).toBeTruthy();
  }));
});
