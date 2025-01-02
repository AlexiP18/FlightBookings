import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFlightComponent } from './dashboard-flight.component';

describe('DashboardFlightComponent', () => {
  let component: DashboardFlightComponent;
  let fixture: ComponentFixture<DashboardFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFlightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
