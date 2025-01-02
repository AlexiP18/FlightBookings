import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  logos: string[] = [
    'assets/images/avianca.png',
    'assets/images/latam.png',
    'assets/images/klm.png',
    'assets/images/delta.png',
    'assets/images/iberia.png',
    'assets/images/spirit.png'
  ];
}
