import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClariusDashboardComponent } from './dashboard.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ClariusDashboardComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ClariusDashboardComponent],
})
export class DashboardModule {}
