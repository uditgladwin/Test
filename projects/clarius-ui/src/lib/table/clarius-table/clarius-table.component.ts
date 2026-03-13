import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../models/table-column.model';
import { TableConfig } from '../models/table-config.model';
import { TableAction } from '../models/table-action.model';

@Component({
  selector: 'clarius-table',
  templateUrl: './clarius-table.component.html',
  styleUrls: ['./clarius-table.component.css'],
})
export class ClariusTableComponent {
  @Input() rows: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() config?: TableConfig;

  @Output() rowClicked = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<{ action: TableAction; row: any }>();
}
