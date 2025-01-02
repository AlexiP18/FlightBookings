import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flightBookings';

  userRole: 'admin' | 'client' | null = null; // Controla el rol del usuario

  constructor(private router: Router) {}

  // Simular inicio de sesión
  loginAs(role: 'admin' | 'client') {
    this.userRole = role;
  }

  // Cerrar sesión
  logout() {
    this.userRole = null;
    this.router.navigate(['/login']); // Redirigir al login
  }

}
