import { TestBed, inject } from '@angular/core/testing';

import { FreeTrialService } from './free-trial.service';

describe('FreeTrialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreeTrialService]
    });
  });

  it('should be created', inject([FreeTrialService], (service: FreeTrialService) => {
    expect(service).toBeTruthy();
  }));
});
