import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const token = localStorage.getItem('token');
    const request = req.clone(
      {
        headers: req.headers.set('Authorization', 'Bearer' + ' ' + authService.getToken()),
      });
    return next.handle(request);
  }

}
