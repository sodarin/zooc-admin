import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerModalComponent } from './lecturer-modal.component';

describe('LecturerModalComponent', () => {
  let component: LecturerModalComponent;
  let fixture: ComponentFixture<LecturerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
