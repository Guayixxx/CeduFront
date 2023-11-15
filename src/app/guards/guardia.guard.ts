import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guardiaGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService)
  const router = inject(Router);

  const cookieExists = cookieService.check('authResponse');
  if (cookieExists) {
    return true; // Permite el acceso a la ruta protegida
  } else {
    router.navigate(['/login']);
    return false; // Redirige a la página de inicio de sesión u otra página apropiada
  }
};
