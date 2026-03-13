import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { TableAction } from '../../models/table-action.model';

@Component({
  selector: 'clarius-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css'],
})
export class TableCellComponent {
  @Input() column!: TableColumn;
  @Input() row: any;

  @Output() actionClicked = new EventEmitter<TableAction>();
}
