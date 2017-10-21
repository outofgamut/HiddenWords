import { TestBed, inject } from '@angular/core/testing';

import { PlainSightServiceService } from './plain-sight-service.service';

describe('PlainSightServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlainSightServiceService]
    });
  });

  it('should be created', inject([PlainSightServiceService], (service: PlainSightServiceService) => {
    expect(service).toBeTruthy();
  }));
});
