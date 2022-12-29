import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../../models/product';
import { HandleError, HttpErrorHandler } from 'src/app/config/http-error-handler.service';
import { DialogElements } from '../dialog/dialog-element.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment.prod';
import { AccountService } from 'src/app/service/account/account.service';
import { Client } from 'src/app/models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  car: Product[] = [];
  productUrl = '/api/v1/product';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ProductesService');
  }

  getCarShop() {
    console.log(this.car)
    return this.car;
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + this.productUrl)
      .pipe(
        catchError(this.handleError('getProduct', []))
      );
  }

  searchProductes(term: string): Observable<Product[]> {
    term = term.trim();

    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Product[]>(environment.apiUrl + this.productUrl, options)
      .pipe(
        catchError(this.handleError<Product[]>('searchProductes', []))
      );
  }


  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.apiUrl + this.productUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError('addProduct', product))
      );
  }

  deleteProduct(id: number): Observable<unknown> {
    const url = `${environment.apiUrl + this.productUrl}/${id}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteProduct'))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(environment.apiUrl + this.productUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError('updateProduct', product))
      );
  }
}

