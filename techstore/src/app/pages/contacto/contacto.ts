import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: false,
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  nombre: string = '';
  email: string = '';
  mensaje: string = '';
  enviado: boolean = false;

  enviarMensaje(): void {
    if (this.nombre && this.email && this.mensaje) {
      this.enviado = true;
      this.nombre = '';
      this.email = '';
      this.mensaje = '';
    }
  }
}
