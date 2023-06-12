import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalukListComponent } from './taluk-list.component';

describe('TalukListComponent', () => {
  let component: TalukListComponent;
  let fixture: ComponentFixture<TalukListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalukListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalukListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
