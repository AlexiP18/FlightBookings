import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent implements OnInit {
  showModal = false;
  flightData: any = null;
  flights = [
    { flightId: 'A123', aerolinea: 'Avianca', origen: 'Quito', destino: 'Guayaquil', fecha: new Date(), precio: 120.0, asientos: 30 },
    { flightId: 'B456',aerolinea: 'KLM', origen: 'Cuenca', destino: 'Manta', fecha: new Date(), precio: 100.0, asientos: 25 },
    // Más datos...
  ];
  filteredFlights = [...this.flights];
  paginatedFlights: { flightId: string; aerolinea: string, origen: string; destino: string; fecha: Date; precio: number; asientos: number; }[] = [];
  searchTerm = '';

  isEditing = false; // Controlar si se está editando un vuelo
  selectedFlight: any = null; // Vuelo seleccionado para editar

  // Paginación
  currentPage = 1;
  itemsPerPage = 5;
  rowsPerPageOptions = [5, 10, 20, 30, 50];
  totalPages = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  openCreateModal() {
    this.flightData = null;
    this.showModal = true;
  }

  openEditModal(flight: any) {
    console.log('Editando vuelo:', flight);
    this.flightData = {...flight};
    this.showModal = true;
  }

  saveFlight(flight: any) {
    if (this.flightData) {
      // Editar vuelo existente
      const index = this.flights.findIndex((f) => f.flightId === this.flightData.id);
      if (index !== -1) {
        this.flights[index] = { ...this.flights[index], ...flight };
      }
    } else {
      // Agregar nuevo vuelo
      this.flights.push({ id: this.flights.length + 1, ...flight });
    }
    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }

  filterFlights() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    this.filteredFlights = this.flights.filter(
      (flight) =>
        flight.origen.toLowerCase().includes(lowerSearchTerm) ||
        flight.destino.toLowerCase().includes(lowerSearchTerm) ||
        flight.flightId.toLowerCase().includes(lowerSearchTerm) ||
        flight.aerolinea.toLowerCase().includes(lowerSearchTerm)
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
