import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Client } from '../../models/client';
import { HandleError, HttpErrorHandler } from 'src/app/config/http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class ClientService {
  clientUrl = 'http://localhost:8000/api/v1/client';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClientesService');
  }

  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl)
      .pipe(
        catchError(this.handleError('getClient', []))
      );
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientUrl, client, httpOptions)
      .pipe(
        catchError(this.handleError('addClient', client))
      );
  }

  deleteClient(id: number): Observable<unknown> {
    const url = `${this.clientUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteClient'))
      );
  }

  updatePointsClient(client: Client, price: number): Observable<Client> {
    return this.http.put<Client>(this.clientUrl + `?id_client=${client.id}&price=${price}`,  httpOptions)
      .pipe(
        catchError(this.handleError('updatePointsClient', client))
      );
  }
}

