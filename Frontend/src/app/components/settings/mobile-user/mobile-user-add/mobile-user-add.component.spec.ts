import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserAddComponent } from './mobile-user-add.component';

describe('MobileUserAddComponent', () => {
  let component: MobileUserAddComponent;
  let fixture: ComponentFixture<MobileUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
