import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClariusTableComponent } from './clarius-table/clarius-table.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { ScrollSyncDirective } from './directives/scroll-sync.directive';

@NgModule({
  declarations: [
    ClariusTableComponent,
    TableHeaderComponent,
    TableRowComponent,
    TableCellComponent,
    ScrollSyncDirective,
  ],
  imports: [CommonModule],
  exports: [ClariusTableComponent],
})
export class TableModule {}
