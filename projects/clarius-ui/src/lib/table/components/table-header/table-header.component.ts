import { Component, Input } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';

@Component({
  standalone: false,
  selector: 'clarius-table-header',
  templateUrl: './table-header.component.html',
})
export class TableHeaderComponent {
  @Input() columns: TableColumn[] = [];
}
