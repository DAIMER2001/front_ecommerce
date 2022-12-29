import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCarComponent } from './components/shopping-car/shopping-car.component';
import { AuthGuard } from './_helpers/auth.guard';

const accountModule = () => import('./account/account-module').then(x => x.AccountModule);

const routes: Routes = [
    { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'shopping', component: ShoppingCarComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: '**', redirectTo: '' }
]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
