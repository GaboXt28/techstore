import { Pipe, PipeTransform } from '@angular/core';

// Pipe personalizado: aplica un % de descuento y devuelve "S/ precioFinal"
@Pipe({
  name: 'descuento',
  standalone: false,
})
export class DescuentoPipe implements PipeTransform {
  transform(precio: number, porcentaje: number = 10): string {
    if (!precio || porcentaje < 0 || porcentaje > 100) return `S/ ${precio}`;
    const descuento = precio * (porcentaje / 100);
    const precioFinal = precio - descuento;
    return `S/ ${precioFinal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
