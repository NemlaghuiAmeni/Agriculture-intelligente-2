import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllligneComponent } from './allligne.component';

describe('AllligneComponent', () => {
  let component: AllligneComponent;
  let fixture: ComponentFixture<AllligneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllligneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllligneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
