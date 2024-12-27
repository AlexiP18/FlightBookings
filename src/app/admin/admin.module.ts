import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FlightListComponent } from './components/Flight/flight-list/flight-list.component';
import { FlightCreateComponent } from './components/Flight/flight-create/flight-create.component';
import { FlightEditComponent } from './components/Flight/flight-edit/flight-edit.component';
import { FlightDeleteComponent } from './components/Flight/flight-delete/flight-delete.component';
import { UserListComponent } from './components/User/user-list/user-list.component';
import { UserEditComponent } from './components/User/user-edit/user-edit.component';
import { UserDeleteComponent } from './components/User/user-delete/user-delete.component';
import { BookingListComponent } from './components/Booking/booking-list/booking-list.component';
import { BookingDetailComponent } from './components/Booking/booking-detail/booking-detail.component';
import { BookingCancelComponent } from './components/Booking/booking-cancel/booking-cancel.component';
import { BookingModifyComponent } from './components/Booking/booking-modify/booking-modify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    FlightListComponent,
    FlightCreateComponent,
    FlightEditComponent,
    FlightDeleteComponent,
    UserListComponent,
    UserEditComponent,
    UserDeleteComponent,
    BookingListComponent,
    BookingDetailComponent,
    BookingCancelComponent,
    BookingModifyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
