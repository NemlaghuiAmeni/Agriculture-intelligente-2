import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimmingControlComponent } from './dimming-control.component';

describe('DimmingControlComponent', () => {
  let component: DimmingControlComponent;
  let fixture: ComponentFixture<DimmingControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimmingControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimmingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
