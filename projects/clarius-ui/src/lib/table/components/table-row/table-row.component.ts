import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { TableAction } from '../../models/table-action.model';

@Component({
  selector: 'clarius-table-row',
  templateUrl: './table-row.component.html',
})
export class TableRowComponent {
  @Input() row: any;
  @Input() columns: TableColumn[] = [];

  @Output() actionClicked = new EventEmitter<TableAction>();
}
