import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Client, Product } from 'src/app/models';
import { ProductService } from './product.service';
import { ClientService } from '../client/client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogElements } from '../dialog/dialog-element.component';
import { CartService } from 'src/app/service/cart/cart.service';
import { AccountService } from 'src/app/service/account/account.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService, ClientService],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  user!: Client;
  products: Product[] = [];
  mybreakpoint: number;
  
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private accountService: AccountService,
    private router: Router,
    private cartService: CartService,
    private clientService: ClientService) {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
    this.accountService.user.subscribe(x => this.user = x);
  }

  @ViewChild('productAdd')
  set heroEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  addProduct(product: Product) {
    console.log('product')
    console.log(product)
  }

  addProductToShop(product: Product) {
    this.cartService.addProductToShop(product)
    this.dialog.open(DialogElements, {
      data: {
        title: 'Producto agregado correctamente',
        msg: 'puedes ver tus productos en el carrito de compras y finalizar tu pedido.',
      }
    });
  }

  redimePoints(product: Product){
    this.clientService.redimePoints((product.acumulation_points * -1))
    .pipe(first())
    .subscribe({
      next: () => {
        this.clientService.getClientByName().subscribe({})
        this.router.navigateByUrl('/');
      }
    });
  }

  removeProductToShop(product: Product){
    this.productService.car.splice(this.productService.car.indexOf(product), 1)
    console.log(this.productService.car)
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

}

