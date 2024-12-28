import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  showDetailModal = false;
  selectedReservation: any = null;
  reservations = [
    { reservationId: 'R001', userId: 'U001', flightId: 'F001', reservationDate: new Date(), status: 'Activa' },
    { reservationId: 'R002', userId: 'U002', flightId: 'F002', reservationDate: new Date(), status: 'Cancelada' },
    { reservationId: 'R003', userId: 'U003', flightId: 'F003', reservationDate: new Date(), status: 'Pospuesta' },
    // Más datos...
  ];
  filteredReservations = [...this.reservations];
  paginatedReservations: { reservationId: string; userId: string; flightId: string; reservationDate: Date; status: string; }[] = [];
  searchTerm = '';

  // Opciones de estado
  statusOptions = ['Activa', 'Pospuesta', 'Cancelada'];

  // Paginación
  currentPage = 1;
  itemsPerPage = 5;
  rowsPerPageOptions = [5, 10, 20, 30, 50];
  totalPages = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  filterReservations() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    this.filteredReservations = this.reservations.filter(
      (reservation) =>
        reservation.reservationId.toLowerCase().includes(lowerSearchTerm) ||
        reservation.userId.toLowerCase().includes(lowerSearchTerm) ||
        reservation.flightId.toLowerCase().includes(lowerSearchTerm) ||
        reservation.status.toLowerCase().includes(lowerSearchTerm)
    );
    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredReservations.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedReservations = this.filteredReservations.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePagination();
    }
  }

  updateReservationStatus(reservation: any) {
    alert(`El estado de la reserva con ID ${reservation.reservationId} cambió a: ${reservation.status}`);
    // Aquí puedes implementar la lógica para guardar este cambio.
  }

  viewReservationDetails(reservation: any) {
    this.selectedReservation = reservation;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
  }

  updateRowsPerPage() {
    this.currentPage = 1;
    this.calculatePagination();
  }
}
