import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Client, ClientModule } from '../../models/client';
import { HandleError, HttpErrorHandler } from 'src/app/config/http-error-handler.service';
import { environment } from '../../../environments/environment.prod';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';

@Injectable()
export class ClientService {
  user!: Client;
  clientUrl = '/api/v1/client';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClientesService');
    this.accountService.user.subscribe(x => this.user = x);
  }

  getClientByName() {
    return this.http.get<ClientModule>(environment.apiUrl + this.clientUrl + `/points/${this.user.name}`)
    .pipe(map((user) => { 
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
      this.accountService.setUser(user)
      return user;
     }),
     catchError(this.handleError('getClient', []))

    );
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(environment.apiUrl + this.clientUrl, client)
      .pipe(
        catchError(this.handleError('addClient', client))
      );
  }

  deleteClient(id: number): Observable<unknown> {
    const url = `${environment.apiUrl + this.clientUrl}/${id}`; 
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteClient'))
      );
  }

  updatePointsClient(price: number) {
    console.log('updatePointsClient2')
    console.log(price)
    console.log(this.user)
    return this.http.put<ClientModule>(environment.apiUrl + this.clientUrl + `/points?id_client=${this.user.id}&price=${price}`, this.user)
      .pipe(map(user => {
        return user;
       }),
       catchError(this.handleError('updatePointsClient', this.user))
      );
  }

  redimePoints(points: number){
    return this.http.put<ClientModule>(environment.apiUrl + this.clientUrl + `/redime-points?id_client=${this.user.id}&points=${points}`, this.user)
      .pipe(map(user => {
        return user;
       }),
       catchError(this.handleError('updatePointsClient', this.user))
      );
  }
}

