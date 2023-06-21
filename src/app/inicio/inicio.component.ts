import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  mostrarComponente = false;
  mostrarComponenteActual = true;

  llamarComponente(): void {
    this.mostrarComponenteActual = false;
    this.mostrarComponente = true;
   
  }
}
