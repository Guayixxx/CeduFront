import { TestBed } from '@angular/core/testing';

import { HojaVidaService } from './hoja-vida.service';

describe('HojaVidaService', () => {
  let service: HojaVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HojaVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
