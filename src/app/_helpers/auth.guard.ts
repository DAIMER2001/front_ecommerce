import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../service/account/account.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        console.log('AUTH GUARD JAJAJAJ ', user);
        if (user?.id) {
            // authorised so return true
            return true;
        }
        this.router.navigateByUrl('/account/login');
        return false;
    }
}