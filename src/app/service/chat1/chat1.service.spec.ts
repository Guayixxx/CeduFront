import { TestBed } from '@angular/core/testing';

import { Chat1Service } from './chat1.service';

describe('Chat1Service', () => {
  let service: Chat1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chat1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
