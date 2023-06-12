import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerWidgetComponent } from './farmer-widget.component';

describe('FarmerWidgetComponent', () => {
  let component: FarmerWidgetComponent;
  let fixture: ComponentFixture<FarmerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
