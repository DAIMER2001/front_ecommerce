import { Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  title: string;
  msg: string;
  infoPedido: string[]
}


@Component({
    selector: 'dialog-elements-dialog',
    templateUrl: 'dialog-element.component.html',
  })
  export class DialogElements {
    cancelButtonText: string = 'OK'
    title: string = 'Producto agregado correctamente'
    msg: string = 'puedes ver tus productos en el carrito de compras y finalizar tu pedido'
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}