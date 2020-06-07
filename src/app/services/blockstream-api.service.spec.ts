import { TestBed } from '@angular/core/testing';

import { BlockstreamApiService } from './blockstream-api.service';

describe('BlockstreamApiService', () => {
  let service: BlockstreamApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockstreamApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
