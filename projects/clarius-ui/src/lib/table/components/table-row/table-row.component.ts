import { Component, Input } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';

@Component({
  selector: 'clarius-table-row',
  templateUrl: './table-row.component.html',
})
export class TableRowComponent {
  @Input() row: any;
  @Input() columns: TableColumn[] = [];
}
