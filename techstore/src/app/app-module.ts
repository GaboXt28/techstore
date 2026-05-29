import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Ofertas } from './pages/ofertas/ofertas';
import { Tienda } from './pages/tienda/tienda';
import { Contacto } from './pages/contacto/contacto';
import { MiCuenta } from './pages/mi-cuenta/mi-cuenta';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { NotFound } from './pages/not-found/not-found';
import { ConceptosJs } from './pages/conceptos-js/conceptos-js';
import { DescuentoPipe } from './pipes/descuento-pipe';

@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    Home,
    Productos,
    Ofertas,
    Tienda,
    Contacto,
    MiCuenta,
    Login,
    Dashboard,
    NotFound,
    ConceptosJs,
    DescuentoPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
