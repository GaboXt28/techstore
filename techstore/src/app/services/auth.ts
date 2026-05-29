import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'techstore_user';

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'admin@techstore.com' && password === 'admin123') {
      const user = { nombre: 'Admin TechStore', email, rol: 'admin', fechaLogin: new Date().toISOString() };
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }

  getUser(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }
}
