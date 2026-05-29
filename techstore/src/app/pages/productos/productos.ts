import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  busqueda: string = '';
  cargando: boolean = true;

  constructor(private productoService: ProductoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
      this.productosFiltrados = data;
      this.categorias = [...new Set(data.map(p => p.categoria))];
      this.cargando = false;
      this.cdr.detectChanges();
    });
  }

  filtrar(): void {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideCategoria = this.categoriaSeleccionada ? p.categoria === this.categoriaSeleccionada : true;
      return coincideNombre && coincideCategoria;
    });
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.categoriaSeleccionada = '';
    this.productosFiltrados = this.productos;
  }
}
