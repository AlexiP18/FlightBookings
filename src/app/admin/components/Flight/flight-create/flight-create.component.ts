import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrl: './flight-create.component.css'
})
export class FlightCreateComponent {
  @Output() close = new EventEmitter<void>();
  showModal = true; // Controla la visibilidad del modal
  flightForm: FormGroup;
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
}
