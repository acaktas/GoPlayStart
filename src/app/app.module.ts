import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EqualValidator } from './app.directive';

import { AppComponent }  from './app.component';
import { AppRoutingModule, routedComponents } from './app.routing';
import { DashboardRoutingModule, routedDashboardComponents } from './dashboard/dashboard.routing';
import { AuthGuard } from './auth.guard';


import { AppService } from './app.service';

@NgModule({
  imports:      [ BrowserModule, NgbModule.forRoot(), FormsModule, HttpModule, AppRoutingModule, DashboardRoutingModule ],
  declarations: [ AppComponent, EqualValidator, routedComponents, routedDashboardComponents ],
  bootstrap:    [ AppComponent ],
  providers:    [ AuthGuard, AppService]
})
export class AppModule { }
