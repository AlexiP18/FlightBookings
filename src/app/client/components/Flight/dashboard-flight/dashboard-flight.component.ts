import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-dashboard-flight',
  templateUrl: './dashboard-flight.component.html',
  styleUrl: './dashboard-flight.component.css'
})
export class DashboardFlightComponent implements OnInit {
  searchParams = {
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: 1
  };

  // Listado de datos
  vuelos: any[] = [
    { aerolinea: 'Avianca', precio: 500, asientos: 20, origen: 'Quito', destino: 'Nueva York', fecha: '2024-01-15' },
    { aerolinea: 'Latam', precio: 700, asientos: 15, origen: 'Guayaquil', destino: 'París', fecha: '2024-01-20' },
    { aerolinea: 'Delta', precio: 450, asientos: 10, origen: 'Manta', destino: 'Londres', fecha: '2024-01-18' },
    { aerolinea: 'Spirit', precio: 550, asientos: 50, origen: 'Cuenca', destino: 'Londres', fecha: '2024-01-18' },
    // Agrega más vuelos para prueba
  ];

  // Ciudades y orígenes
  origenes = ['Quito', 'Latacunga', 'Manta', 'Guayaquil', 'Cuenca'];
  ciudades: string[] = [];
  filteredCiudades: string[] = [];
  showCityList = false;

  vuelosFiltrados: any[] = [];
  paginaActual = 1;
  vuelosPorPagina = 5;
  hayMasVuelos = true;

  selectedFlight: any = null;
  showAddBookingModal:boolean = false;

  constructor(private clientService: ClientService) {
    this.vuelosFiltrados = this.vuelos.slice(0, this.vuelosPorPagina); // Cargar vuelos iniciales
  }

  ngOnInit() {
    // Cargar las ciudades al iniciar
    this.clientService.getCities().subscribe((data) => {
      this.ciudades = data;
      this.filteredCiudades = [...this.ciudades];
    });

    this.vuelosFiltrados = this.vuelos.slice(0, this.vuelosPorPagina);
  }

  // Buscar vuelos con filtros
  buscarVuelos() {
    const { origen, destino, fecha, pasajeros } = this.searchParams;

    this.vuelosFiltrados = this.vuelos.filter((vuelo) => {
      return (
        (!origen || vuelo.origen === origen) &&
        (!destino || vuelo.destino === destino) &&
        (!fecha || vuelo.fecha === fecha) &&
        (vuelo.asientos >= pasajeros)
      );
    });

    this.paginaActual = 1;
    this.hayMasVuelos = this.vuelosFiltrados.length > this.vuelosPorPagina;
    this.vuelosFiltrados = this.vuelosFiltrados.slice(0, this.vuelosPorPagina);
  }

  // Filtrar ciudades dinámicamente
  onSearchCity(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    this.showCityList = true;
    this.filteredCiudades = value
      ? this.ciudades.filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      : [...this.ciudades];
  }

  // Seleccionar una ciudad
  selectCity(city: string) {
    this.searchParams.destino = city;
    this.showCityList = false;
  }

  // Cargar más vuelos dinámicamente
  cargarMasVuelos() {
    this.paginaActual++;
    const inicio = (this.paginaActual - 1) * this.vuelosPorPagina;
    const nuevosVuelos = this.vuelos.slice(inicio, inicio + this.vuelosPorPagina);

    if (nuevosVuelos.length > 0) {
      this.vuelosFiltrados = [...this.vuelosFiltrados, ...nuevosVuelos];
    }

    this.hayMasVuelos = nuevosVuelos.length === this.vuelosPorPagina;
  }

  // Reservar vuelo
  reservarVuelo(vuelo: any) {
    console.log('Vuelo reservado:', vuelo);
    alert(`Has reservado un vuelo con ${vuelo.aerolinea}`);
  }

  openAddBookingModal(flight: any) {
    this.selectedFlight = flight;
    this.showAddBookingModal = true;

    // Reiniciar el formulario explícitamente al abrir el modal
    setTimeout(() => {
      const modalInstance = document.querySelector('app-add-booking') as any;
      if (modalInstance?.openModal) {
        modalInstance.openModal(); // Llama explícitamente a resetForm
      }
    }, 0);
  }

  closeAddBookingModal() {
    this.showAddBookingModal = false;
  }

  addBooking(booking: any) {
    console.log('Reserva confirmada:', booking);
    alert(`Reserva confirmada para el vuelo ${this.selectedFlight.aerolinea}`);
    this.showAddBookingModal = false;
  }
}
