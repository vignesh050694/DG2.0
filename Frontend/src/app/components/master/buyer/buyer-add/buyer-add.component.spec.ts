import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerAddComponent } from './buyer-add.component';

describe('BuyerAddComponent', () => {
  let component: BuyerAddComponent;
  let fixture: ComponentFixture<BuyerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
