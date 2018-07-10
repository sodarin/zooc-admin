import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseBranchInfoComponent } from './enterprise-branch-info.component';

describe('EnterpriseBranchInfoComponent', () => {
  let component: EnterpriseBranchInfoComponent;
  let fixture: ComponentFixture<EnterpriseBranchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseBranchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseBranchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
