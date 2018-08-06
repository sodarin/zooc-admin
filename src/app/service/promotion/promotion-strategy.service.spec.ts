import { TestBed, inject } from '@angular/core/testing';

import { PromotionStrategyService } from './promotion-strategy.service';

describe('PromotionStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotionStrategyService]
    });
  });

  it('should be created', inject([PromotionStrategyService], (service: PromotionStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
