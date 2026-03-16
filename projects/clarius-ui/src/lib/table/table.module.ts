import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClariusTableComponent } from './clarius-table/clarius-table.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ClariusTableComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ClariusTableComponent],
})
export class TableModule {}
