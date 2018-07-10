import { TestBed, inject } from '@angular/core/testing';

import { ElaborateCourseService } from './elaborate-course.service';

describe('ElaborateCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElaborateCourseService]
    });
  });

  it('should be created', inject([ElaborateCourseService], (service: ElaborateCourseService) => {
    expect(service).toBeTruthy();
  }));
});
