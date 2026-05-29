import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-ofertas',
  standalone: false,
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css'
})
export class Ofertas implements OnInit {
  ofertas: Producto[] = [];

  constructor(private productoService: ProductoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productoService.getOfertas().subscribe(data => {
      this.ofertas = data;
      this.cdr.detectChanges();
    });
  }
}
