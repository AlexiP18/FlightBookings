import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDeleteComponent } from './flight-delete.component';

describe('FlightDeleteComponent', () => {
  let component: FlightDeleteComponent;
  let fixture: ComponentFixture<FlightDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
