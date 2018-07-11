import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOfferingInputComponent } from './course-offering-input.component';

describe('CourseOfferingInputComponent', () => {
  let component: CourseOfferingInputComponent;
  let fixture: ComponentFixture<CourseOfferingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOfferingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOfferingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
