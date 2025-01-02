import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css'
})
export class AddBookingComponent implements OnInit, OnChanges {
  @Input() showModal = false; // Controla la visibilidad del modal
  @Input() flightData: any = null; // Datos del vuelo seleccionado
  @Input() searchParams: any = {}; // Parámetros de la búsqueda inicial
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() book = new EventEmitter<any>(); // Evento para realizar la reserva

  ciudades: string[] = [];
  filteredCiudades: string[] = [];
  showCityList = false;

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.bookingForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fecha: ['', Validators.required],
      pasajeros: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    // Carga las ciudades al inicializar
    this.resetForm();
    this.clientService.getCities().subscribe((data) => {
      this.ciudades = data;
      this.filteredCiudades = [...this.ciudades];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['flightData'] && this.flightData) {
      // Formatear la fecha según su origen (fecha o fechaSalida)
      const formattedDate = this.getFormattedDate(
        this.flightData.fecha || this.flightData.fechaSalida
      );

      // Reiniciar el formulario con los datos disponibles
      this.bookingForm.reset({
        origen: this.flightData.origen || '',
        destino: this.flightData.destino || '',
        fecha: formattedDate, // Usar la fecha formateada
        pasajeros: this.flightData.asientos || 1
      });
    }
  }

  // Método para formatear fechas al formato 'YYYY-MM-DD'
  private getFormattedDate(date: string | null): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }

  // Método para abrir y reiniciar el formulario
  resetForm() {
    if (this.flightData || Object.keys(this.searchParams).length > 0) {
      this.bookingForm.reset({
        origen: this.searchParams.origen || this.flightData?.origen || '',
        destino: this.searchParams.destino || this.flightData?.destino || '',
        fecha: this.searchParams.fecha || this.flightData?.fecha || '',
        pasajeros: this.searchParams.pasajeros || 1
      });
    } else {
      // Si no hay datos, limpia todo
      this.bookingForm.reset({
        origen: '',
        destino: '',
        fecha: '',
        pasajeros: 1
      });
    }
  }

  openModal() {
    this.resetForm(); // Limpia el formulario al abrir el modal
  }

  onSearchCity(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    this.showCityList = true;
    this.filteredCiudades = value
      ? this.ciudades.filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      : [...this.ciudades];
  }

  selectCity(city: string) {
    this.bookingForm.patchValue({ destino: city });
    this.showCityList = false;
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmBooking() {
    const pasajeros = this.bookingForm.get('pasajeros')?.value;
    if (pasajeros > this.flightData.asientos) {
      alert(`El número de pasajeros no puede exceder los asientos disponibles (${this.flightData.asientos}).`);
      return;
    }

    if (this.bookingForm.valid) {
      this.book.emit(this.bookingForm.value); // Emitir los datos de la reserva
      this.closeModal();
    }
  }

}
