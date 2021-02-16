import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErisLoginComponent } from './eris-login.component';

describe('ErisLoginComponent', () => {
  let component: ErisLoginComponent;
  let fixture: ComponentFixture<ErisLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErisLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErisLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
