import { Product } from '../../models/product';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/config/http-error-handler.service';
import { AccountService } from '../account/account.service';
import { Client } from 'src/app/models';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  user!: Client;
  private handleError: HandleError;

  constructor(
    httpErrorHandler: HttpErrorHandler,
    private accountService: AccountService) {
    this.handleError = httpErrorHandler.createHandleError('CartService');
    this.accountService.user.subscribe(x => this.user = x);
  }


  getItems() {
    return this.items;
  }

  getClientId() {
    return this.user.id;
  }


  addProductToShop(product: Product) {
    console.log(this.user.id)
    if (this.user.id){
      if(this.items.length){
        const productExist: any = this.items.find(productCar => productCar.id_product === product.id_product)
        if (productExist){
          productExist.cantidad++ 
          return
        }
      }
      product.cantidad = 1
      this.items.push(product)
      console.log(this.items)
    } else {
      catchError(this.handleError('sin autorización', []))
    }
    console.log(product)
    console.log(this.items)
  }

  removeProductToShop(product: Product){
    if (this.user.id){
      this.items.splice(this.items.indexOf(product), 1)
      console.log(this.items)
    } else {
      catchError(this.handleError('sin autorización', []))
    }
  }



  clearCart() {
    this.items = [];
    return this.items;
  }

}