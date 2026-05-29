import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  productosDestacados: Producto[] = [];
  categorias = ['Laptops', 'Smartphones', 'Monitores', 'Periféricos', 'Audio', 'Tablets'];

  constructor(private productoService: ProductoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productosDestacados = productos.slice(0, 4);
      this.cdr.detectChanges();
    });
  }
}
