import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule, routedComponents } from './app.routing';

import { EqualValidator } from './app.directive';

import { AppComponent }  from './app.component';
import { RegisterComponent } from './register/register.component';

import { AppService } from './app.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent, EqualValidator, RegisterComponent, routedComponents ],
  bootstrap:    [ AppComponent ],
  providers:    [ AppService]
})
export class AppModule { }
