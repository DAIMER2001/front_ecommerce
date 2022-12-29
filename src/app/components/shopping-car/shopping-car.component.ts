import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models';
import { DialogElements } from '../dialog/dialog-element.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../product-list/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { ClientService } from '../client/client.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.scss'],
  providers: [DialogElements, ClientService]
})
export class ShoppingCarComponent implements OnInit {
  mybreakpoint: number;
  items: Product[];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private clientService: ClientService,
    private router: Router,
    public dialog: MatDialog) {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
    this.items = this.cartService.getItems()
    console.log(this.items)
  }

  ngOnInit(): void {
    console.log(this.items)
  }

  @ViewChild('productAdd')
  set heroEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  removeProductToShop(product: Product){
    this.cartService.removeProductToShop(product)
    this.dialog.open(DialogElements, {
      data: {
        title: 'Producto eliminado correctamente',
        msg: 'puedes continuar con tu compra.',
      }
    });
  }

  handleSize(event: any){
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
  }

  sellProducts(){
    let priceTotal = 0
    let msgSell : any[] = []
    let cont = 0
    this.items.map((item: Product) => {
      cont++
      priceTotal = item.price + priceTotal
      msgSell.push(`${cont}. Producto: ${item.name} \n  Precio: ${item.price} \n Cantidad: ${item.cantidad} `)
    })
    console.log(priceTotal)
    console.log(this.items)
    this.clientService.updatePointsClient(priceTotal)
    .pipe(first())
    .subscribe({
      next: () => {
        this.dialog.open(DialogElements, {
          data: {
            title: 'Gracias por tu compra',
            infoPedido: msgSell,
          }
        }).afterClosed().subscribe(() => {
          this.router.navigateByUrl('/');
        });
        this.clientService.getClientByName().subscribe({})
      }
    });
  }

}

