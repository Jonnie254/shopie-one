import { TestBed } from '@angular/core/testing';

import { CartService } from './local-storage-servic.service';

describe('LocalStorageServicService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
