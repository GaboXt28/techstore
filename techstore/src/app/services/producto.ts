import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
  oferta: boolean;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getOfertas(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?oferta=true`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let mensaje = 'Error desconocido';
    if (error.status === 0) {
      mensaje = `Error de conexión: ${error.message}`;
    } else {
      mensaje = `Error ${error.status}: ${error.message}`;
    }
    console.error('[ProductoService]', mensaje);
    return throwError(() => new Error(mensaje));
  }
}
