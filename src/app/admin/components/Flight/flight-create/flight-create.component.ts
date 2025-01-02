import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrl: './flight-create.component.css'
})
export class FlightCreateComponent implements OnChanges{
  @Input() showModal = false; // Controla la visibilidad del modal
  @Input() flightData: any = null; // Datos del vuelo a editar
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() save = new EventEmitter<any>(); // Evento para guardar los cambios
  flightForm: FormGroup;
  title = 'Agregar Vuelo'; // Título del modal
  destinos = [
    'Nueva York',
    'París',
    'Londres',
    'Tokio',
    'Dubai',
    'Sídney',
    'Singapur',
    'Hong Kong',
    'Barcelona',
    'Roma',
  ];
  filteredCiudades: string[] = [];
  showCityList = false;

  aerolineas = [
    'Avianca',
    'Tame',
    'Latam',
    'KLM',
    'Spirit',
    'AirEuropa',
    'American Airlines',
    'Iberia',
    'Delta',
    'United',
  ];

  origenes = ['Quito', 'Latacunga', 'Manta', 'Guayaquil'];

  constructor(private fb: FormBuilder) {
    this.flightForm = this.fb.group({
      aerolinea: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', Validators.required],
      precio: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10000),
        ],
      ],
      asientos: [
        '',
        [Validators.required, Validators.min(1), Validators.max(800)],
      ],
    });
    this.filteredCiudades = this.destinos;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['flightData'] && this.flightData) {
      console.log('Datos del vuelo recibidos para edición:', this.flightData);
      const formattedFlightData = { ...this.flightData };
      // Extraer solo la fecha (YYYY-MM-DD) del valor de fecha y hora
      if (this.flightData.fecha) {
        const date = new Date(this.flightData.fecha);
        formattedFlightData.fecha = date.toISOString().split('T')[0]; // Solo la fecha
      }
      this.title = 'Editar Vuelo'; // Cambiar el título
      this.flightForm.patchValue(formattedFlightData);
    } else {
      this.title = 'Agregar Vuelo'; // Título para creación
      this.flightForm.reset(); // Limpiar el formulario
    }
  }

  onSearchCity(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    // Mostrar lista siempre que el usuario interactúe con el campo
    this.showCityList = true;

    if (value) {
      // Filtra solo si hay texto en el input
      this.filteredCiudades = this.destinos.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      // Si no hay texto, muestra todas las ciudades
      this.filteredCiudades = [...this.destinos];
    }
  }

  selectCity(city: string) {
    this.flightForm.patchValue({ destino: city });
    this.showCityList = false; // Oculta la lista después de seleccionar
  }

  closeList() {
    // Usa un pequeño retraso para permitir la selección antes de ocultar
    setTimeout(() => {
      this.showCityList = false;
    }, 100);
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
    this.filteredCiudades = [];
    this.showCityList = false; // Asegúrate de ocultar la lista
  }
  onSubmit() {
    if (this.flightForm.valid) {
      console.log('Vuelo agregado:', this.flightForm.value);
      this.closeModal();
    } else {
      console.log('Formulario inválido');
      this.flightForm.markAllAsTouched();
    }
  }

  saveFlight() {
    if (this.flightForm.valid) {
      const formData = this.flightForm.value;

      // Combinar fecha seleccionada con la hora original
      if (this.flightData && this.flightData.fecha) {
        const originalDate = new Date(this.flightData.fecha);
        const selectedDate = new Date(formData.fecha);

        // Combinar fecha del input con la hora original
        selectedDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds());
        formData.fecha = selectedDate.toISOString(); // Fecha y hora combinadas
      }

      console.log('Datos a guardar:', formData);
      this.save.emit(formData); // Emitir los datos combinados
      this.closeModal();
    }
  }
}
