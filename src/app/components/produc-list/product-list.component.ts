import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductService } from './product.service';
import { ClientService } from '../client/client.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  mybreakpoint: number;
  cart: Product[] = [];
  
  constructor(private productService: ProductService, private clientService: ClientService) {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
  }

  share() {
    window.alert('The product has been shared!');
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProduct()
      .subscribe(products => (this.products = products));
  }

  handleSize(event: any){
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
  }

  add(product: Product){
    this.cart.push(product)
    console.log(this.cart)
  }

  remove(product: Product){
    this.cart.splice(this.cart.indexOf(product), 1)
    console.log(this.cart)
  }

}

