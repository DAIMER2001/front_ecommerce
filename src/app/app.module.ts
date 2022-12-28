import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './components/produc-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './config/http-error-handler.service';
import { MessageService } from './config/message.service';
import { RequestCache, RequestCacheWithMap } from './config/request-cache.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialeModule } from './material/material.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatGridListModule,
    MaterialeModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
    ]),
    DragDropModule,
    
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
  ],
  bootstrap: [
    AppComponent
  ]
})


export class AppModule { }