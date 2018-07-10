import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseLecturerInfoComponent } from './enterprise-lecturer-info.component';

describe('EnterpriseLecturerInfoComponent', () => {
  let component: EnterpriseLecturerInfoComponent;
  let fixture: ComponentFixture<EnterpriseLecturerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseLecturerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseLecturerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
