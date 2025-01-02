import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FlightListComponent } from './components/Flight/flight-list/flight-list.component';
import { UserListComponent } from './components/User/user-list/user-list.component';
import { BookingListComponent } from './components/Booking/booking-list/booking-list.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'flights', component: FlightListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'bookings', component: BookingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
