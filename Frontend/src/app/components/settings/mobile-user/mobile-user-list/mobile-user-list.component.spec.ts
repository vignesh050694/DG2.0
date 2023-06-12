import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserListComponent } from './mobile-user-list.component';

describe('MobileUserListComponent', () => {
  let component: MobileUserListComponent;
  let fixture: ComponentFixture<MobileUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
