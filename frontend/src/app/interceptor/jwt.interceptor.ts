import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const jwtInterceptor: HttpInterceptorFn =
  (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const auth = inject(AuthenticationService);

  if (auth.isAuthentified)
    console.log('Ajout du token à la requête');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.token}`
      }
    })
  return next(request);
};
