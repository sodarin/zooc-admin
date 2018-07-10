import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentModalComponent } from './moment-modal.component';

describe('MomentModalComponent', () => {
  let component: MomentModalComponent;
  let fixture: ComponentFixture<MomentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
