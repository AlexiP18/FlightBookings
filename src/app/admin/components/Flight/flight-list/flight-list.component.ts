import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent implements OnInit {
  flights = [
    { flightId: 'A123', origin: 'Quito', destination: 'Guayaquil', dateTime: new Date(), price: 120.0, availableSeats: 30 },
    { flightId: 'B456', origin: 'Cuenca', destination: 'Manta', dateTime: new Date(), price: 100.0, availableSeats: 25 },
    // Más datos...
  ];
  filteredFlights = [...this.flights];
  paginatedFlights: { flightId: string; origin: string; destination: string; dateTime: Date; price: number; availableSeats: number; }[] = [];
  searchTerm = '';

  // Paginación
  currentPage = 1;
  itemsPerPage = 5;
  rowsPerPageOptions = [5, 10, 20, 30, 50];
  totalPages = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  filterFlights() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    this.filteredFlights = this.flights.filter(
      (flight) =>
        flight.origin.toLowerCase().includes(lowerSearchTerm) ||
        flight.destination.toLowerCase().includes(lowerSearchTerm) ||
        flight.flightId.toLowerCase().includes(lowerSearchTerm)
    );
    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredFlights.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedFlights = this.filteredFlights.slice(start, end);
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

  deleteFlight(flightId: string) {
    if (confirm('¿Estás seguro de eliminar este vuelo?')) {
      this.flights = this.flights.filter((flight) => flight.flightId !== flightId);
      this.filterFlights();
    }
  }

  editFlight(flightId: string) {
    alert(`Editar vuelo con ID: ${flightId}`);
  }

  addFlight() {
    alert('Agregar un nuevo vuelo');
  }

  updateRowsPerPage() {
    this.currentPage = 1;
    this.calculatePagination();
  }
}
