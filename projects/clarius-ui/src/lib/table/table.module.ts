import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClariusTableComponent } from './clarius-table/clarius-table.component';

@NgModule({
  declarations: [ClariusTableComponent],
  imports: [CommonModule],
  exports: [ClariusTableComponent],
})
export class TableModule {}
