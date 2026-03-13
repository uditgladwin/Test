import { Component, Input } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';

@Component({
  selector: 'clarius-table-cell',
  templateUrl: './table-cell.component.html',
})
export class TableCellComponent {
  @Input() column!: TableColumn;
  @Input() row: any;
}
