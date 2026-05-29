import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  usuario: any;
  productos: Producto[] = [];
  totalProductos: number = 0;
  totalOfertas: number = 0;
  fechaActual: Date = new Date();

  constructor(
    private authService: AuthService,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
    this.productoService.getProductos().subscribe({
      next: data => {
        this.productos = data;
        this.totalProductos = data.length;
        this.totalOfertas = data.filter(p => p.oferta).length;
        this.cdr.detectChanges();
      },
      error: err => console.error('[Dashboard] HTTP error:', err)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
