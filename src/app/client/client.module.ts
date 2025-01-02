import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { ChangePasswordComponent } from './components/User/change-password/change-password.component';
import { DashboardBookingComponent } from './components/Booking/dashboard-booking/dashboard-booking.component';
import { DashboardFlightComponent } from './components/Flight/dashboard-flight/dashboard-flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookingComponent } from './components/Booking/add-booking/add-booking.component';


@NgModule({
  declarations: [
    ClientComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DashboardBookingComponent,
    DashboardFlightComponent,
    AddBookingComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule { }
