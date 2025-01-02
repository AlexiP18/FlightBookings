import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-booking',
  templateUrl: './dashboard-booking.component.html',
  styleUrl: './dashboard-booking.component.css'
})
export class DashboardBookingComponent {
  searchParams = {
    vueloId: '',
    fechaReserva: '',
    fecha: ''
  };

  bookings = [
    {
      id: '1234',
      fechaReserva: '2024-01-15',
      aerolinea: 'Avianca',
      origen: 'Quito',
      destino: 'Nueva York',
      fechaSalida: '2024-01-20',
      precio: 500,
      asientos: 2
    },
    {
      id: '5678',
      fechaReserva: '2024-02-10',
      aerolinea: 'Latam',
      origen: 'Guayaquil',
      destino: 'París',
      fechaSalida: '2024-02-25',
      precio: 800,
      asientos: 1
    }
  ];

  filteredBookings = [...this.bookings];
  showCancelModal = false;
  showAddBookingModal = false;
  bookingToCancel: any = null;
  bookingToEdit: any = null;

  // Buscar reservas basadas en los parámetros
  buscarReservas() {
    const { vueloId, fechaReserva, fecha } = this.searchParams;

    this.filteredBookings = this.bookings.filter((booking) => {
      const matchesVueloId = !vueloId || booking.id.includes(vueloId);
      const matchesFechaReserva = !fechaReserva || booking.fechaReserva === fechaReserva;
      const matchesFechaVuelo = !fecha || booking.fechaSalida === fecha;
      return matchesVueloId && matchesFechaReserva && matchesFechaVuelo;
    });
  }

  // Abrir modal para confirmar cancelación
  openCancelModal(booking: any) {
    this.bookingToCancel = booking;
    this.showCancelModal = true;
  }

  // Cerrar modal de cancelación
  closeCancelModal() {
    this.showCancelModal = false;
    this.bookingToCancel = null;
  }

  // Confirmar cancelación
  confirmCancel() {
    if (this.bookingToCancel) {
      this.bookings = this.bookings.filter((b) => b.id !== this.bookingToCancel.id);
      this.filteredBookings = this.filteredBookings.filter((b) => b.id !== this.bookingToCancel.id);
    }
    this.closeCancelModal();
  }

  openEditModal(booking: any) {
    this.bookingToEdit = booking; // Pasar datos al modal
    this.showAddBookingModal = true;
  }

  // Cerrar el modal
  closeAddBookingModal() {
    this.showAddBookingModal = false;
    this.bookingToEdit = null;
  }

  // Guardar cambios al editar la reserva
  saveEditedBooking(updatedBooking: any) {
    // Actualiza la reserva existente
    const index = this.bookings.findIndex((b) => b.id === this.bookingToEdit.id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...updatedBooking };
      this.filteredBookings = [...this.bookings]; // Refresca la lista filtrada
    }
    this.closeAddBookingModal();
  }
}
