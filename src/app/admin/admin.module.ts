import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FlightListComponent } from './components/Flight/flight-list/flight-list.component';
import { FlightCreateComponent } from './components/Flight/flight-create/flight-create.component';
import { UserListComponent } from './components/User/user-list/user-list.component';
import { BookingListComponent } from './components/Booking/booking-list/booking-list.component';
import { BookingDetailComponent } from './components/Booking/booking-detail/booking-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    FlightListComponent,
    FlightCreateComponent,
    UserListComponent,
    BookingListComponent,
    BookingDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
