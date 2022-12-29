import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandler } from './config/http-error-handler.service';
import { MessageService } from './config/message.service';
import { RequestCache, RequestCacheWithMap } from './config/request-cache.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './material/material.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingCarComponent } from './components/shopping-car/shopping-car.component';
import { DialogElements } from './components/dialog/dialog-element.component';
import { ProductService } from './components/product-list/product.service';
import { AlertComponent } from './components/alert/alert.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AlertService } from './service/alert/alert.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatGridListModule,
    MaterialModule,
    DragDropModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    TopBarComponent,
    ProductListComponent,
    ShoppingCarComponent,
    DialogElements,
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    ProductService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },    { provide: RequestCache, useClass: RequestCacheWithMap },
  ],
  bootstrap: [
    AppComponent
  ]
})


export class AppModule { }