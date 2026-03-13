import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../models/table-column.model';
import { TableConfig } from '../models/table-config.model';
import { TableAction } from '../models/table-action.model';

@Component({
  standalone: false,
  selector: 'clarius-table',
  templateUrl: './clarius-table.component.html',
})
export class ClariusTableComponent {
  @Input() rows: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() config?: TableConfig;

  @Output() rowClicked = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<{ action: TableAction; row: any }>();
}
