import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule, ButtonModule, DashboardCardModule } from 'clarius-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    ButtonModule,
    DashboardCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
