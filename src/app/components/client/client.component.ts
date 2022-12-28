import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models';
import { ClientService } from './client.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  providers: [ClientService],
  styleUrls: ['./client.component.css']
})
export class ClientListComponent implements OnInit{
  clients: Client[] = [];
  mybreakpoint: number;
  cart: Client[] = [];
  
  constructor(private clientService: ClientService) {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
  }

  share() {
    window.alert('The client has been shared!');
  }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClient()
      .subscribe(clients => (this.clients = clients));
  }

  handleSize(event: any){
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
  }

  add(client: Client){
    this.cart.push(client)
    console.log(this.cart)
  }

  remove(client: Client){
    this.cart.splice(this.cart.indexOf(client), 1)
    console.log(this.cart)
  }

  sellClients(){
    this.clientService.getClient()
      .subscribe(clients => (this.clients = clients));
  }
}

