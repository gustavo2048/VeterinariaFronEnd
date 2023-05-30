import { TestBed } from '@angular/core/testing';

import { PerdidoService } from './perdido.service';

describe('PerdidoService', () => {
  let service: PerdidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerdidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
