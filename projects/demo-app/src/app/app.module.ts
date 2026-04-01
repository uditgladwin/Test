import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule, ButtonModule, DashboardModule, ClariusDataModule, NotificationCardModule } from 'clarius-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    ButtonModule,
    DashboardModule,
    ClariusDataModule,
    NotificationCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
