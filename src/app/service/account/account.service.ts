import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HandleError, HttpErrorHandler } from 'src/app/config/http-error-handler.service';
import { AuthClient, Client, ClientModule, RegisterClient } from 'src/app/models';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<ClientModule>;
  public user: Observable<Client>;
  private handleError: HandleError;

  clientUrl = '/api/v1/client';
  authClient: AuthClient = {name: '', password: ''};
  registerClient: RegisterClient = { name: '', password: '', accumulation_points: 0, role: 'user'};

  constructor(
    private http: HttpClient,
    private router: Router,
    httpErrorHandler: HttpErrorHandler) {
    this.userSubject = new BehaviorSubject<ClientModule>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    this.handleError = httpErrorHandler.createHandleError('ProductesService');
  }

  public get userValue(): Client {
      return this.userSubject.value;
  }

  login(username: string, password: string) {
    this.authClient.name = username;
    this.authClient.password = password;
    return this.http.post<ClientModule>(environment.apiUrl + this.clientUrl + '/auth', this.authClient)
      .pipe(map(user => { 
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
       })
      );
  }

  setUser(user: ClientModule) {
    this.userSubject.next(user);
  }


  logout() {
      localStorage.removeItem('user')
      this.userSubject.next(new ClientModule())
      this.router.navigateByUrl('/account/login')
      console.log(this.user, 'after')
      console.log(this.userSubject, 'after')
      console.log(this.router, 'after')
  }

  register(client: RegisterClient) {
    this.registerClient.name = client.name;
    this.registerClient.password = client.password;
    return this.http.post<Client>(environment.apiUrl + this.clientUrl, this.registerClient)
    .pipe(
        catchError(this.handleError('addProduct', []))
      );
  }

}

