import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingModifyComponent } from './booking-modify.component';

describe('BookingModifyComponent', () => {
  let component: BookingModifyComponent;
  let fixture: ComponentFixture<BookingModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
