import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  showOldPassword = false;
  showNewPassword = false;
  showRepeatPassword = false;

  togglePasswordVisibility(field: 'old' | 'new' | 'repeat') {
    if (field === 'old') {
      this.showOldPassword = !this.showOldPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else {
      this.showRepeatPassword = !this.showRepeatPassword;
    }
  }

  actualizarPassword() {
    alert('Contraseña actualizada correctamente');
  }
}
