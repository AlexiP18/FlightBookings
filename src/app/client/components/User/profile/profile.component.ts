import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com'
  };

  // Método para manejar el cambio de contraseña
  cambiarContrasena() {
    alert('Función para cambiar la contraseña aún no implementada.');
  }
}
