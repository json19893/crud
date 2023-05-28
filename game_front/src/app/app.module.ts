import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing ,AppRoutinProviders} from './app.routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ErrorComponent} from './404/404.component';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component'
import  {GameComponent,EditGameDialog}from './game/game.component'
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './PaginatorI18n';
import { pointService } from './services/poinst.service';

import { FileSaverModule } from 'ngx-filesaver';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MenuComponent,
    HomeComponent,
    GameComponent,
    EditGameDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    GoogleMapsModule,
    HttpClientModule,
    FileSaverModule
  
    ],
    
  providers: [AppRoutinProviders,BrowserModule,pointService,{ provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
