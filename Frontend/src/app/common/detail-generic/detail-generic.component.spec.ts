import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGenericComponent } from './detail-generic.component';

describe('DetailGenericComponent', () => {
  let component: DetailGenericComponent;
  let fixture: ComponentFixture<DetailGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
