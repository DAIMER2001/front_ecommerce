import { Component } from '@angular/core';
import { Client } from 'src/app/models';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent {

  user!: Client;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.accountService.logout();
  }
}
