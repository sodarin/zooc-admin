import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseBasicInfoComponent } from './enterprise-basic-info.component';

describe('EnterpriseBasicInfoComponent', () => {
  let component: EnterpriseBasicInfoComponent;
  let fixture: ComponentFixture<EnterpriseBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
