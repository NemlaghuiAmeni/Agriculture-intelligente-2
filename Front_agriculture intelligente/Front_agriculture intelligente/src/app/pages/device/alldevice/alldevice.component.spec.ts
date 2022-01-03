import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldeviceComponent } from './alldevice.component';

describe('AlldeviceComponent', () => {
  let component: AlldeviceComponent;
  let fixture: ComponentFixture<AlldeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlldeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
