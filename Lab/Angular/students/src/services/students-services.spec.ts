import { TestBed } from '@angular/core/testing';

import { StudentsServices } from './students-services';

describe('StudentsServices', () => {
  let service: StudentsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
