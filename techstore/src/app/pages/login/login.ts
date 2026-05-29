import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';
  cargando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Por favor completa todos los campos.';
      this.cdr.detectChanges();
      return;
    }
    this.cargando = true;
    this.error = '';
    this.cdr.detectChanges();
    setTimeout(() => {
      const exito = this.authService.login(this.email, this.password);
      if (exito) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Credenciales incorrectas. Inténtalo de nuevo.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    }, 800);
  }
}
