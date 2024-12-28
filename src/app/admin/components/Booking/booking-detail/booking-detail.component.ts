import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent {
  @Input() showModal: boolean = false; // Controla la visibilidad del modal
  @Input() reservation: any; // Información de la reserva
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }
}
