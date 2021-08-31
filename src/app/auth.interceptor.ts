import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userdata = localStorage.getItem('userdata'); // you probably want to store it in localStorage or something
    const token = JSON.parse(userdata || '{}');

    if (!token.token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('x-access-token', `${token.token}`),
    });

    return next.handle(req1);
  }
}