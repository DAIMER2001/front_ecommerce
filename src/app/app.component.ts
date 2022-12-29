import { Component } from '@angular/core';
import { Client } from './models';
import { AccountService } from './service/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  client!: Client;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.client = x)
  }

  logout() {
      this.accountService.logout();
  }
}
