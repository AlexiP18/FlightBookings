import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DashboardBookingComponent } from './components/Booking/dashboard-booking/dashboard-booking.component';
import { DashboardFlightComponent } from './components/Flight/dashboard-flight/dashboard-flight.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { ChangePasswordComponent } from './components/User/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'flights', component: DashboardFlightComponent},
  { path: 'bookings', component: DashboardBookingComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'change-password', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
