/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoanDisbursementService } from './loan-disbursement.service';

describe('Service: LoanDisbursement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanDisbursementService]
    });
  });

  it('should ...', inject([LoanDisbursementService], (service: LoanDisbursementService) => {
    expect(service).toBeTruthy();
  }));
});
