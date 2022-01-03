import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsiteComponent } from './allsite.component';

describe('AllsiteComponent', () => {
  let component: AllsiteComponent;
  let fixture: ComponentFixture<AllsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
