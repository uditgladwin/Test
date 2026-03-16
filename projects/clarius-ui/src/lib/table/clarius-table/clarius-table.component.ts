import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableColumn, TableAction } from '../models/table-column.model';

@Component({
  selector: 'clarius-table',
  templateUrl: './clarius-table.component.html',
  styleUrls: ['./clarius-table.component.css'],
})
export class ClariusTableComponent {

  // data
  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];

  // action buttons to show in the "actions" column
  @Input() actions: TableAction[] = [];

  // pass status colors like { 'Available': 'green', 'Offline': 'red' }
  @Input() statusColors: { [value: string]: string } = {};

  // events
  @Output() rowClicked = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();

  getStatusColor(value: string): string {
    return this.statusColors[value] || 'gray';
  }

  onActionClick(actionId: string, row: any, event: MouseEvent): void {
    event.stopPropagation();
    this.actionClicked.emit({ action: actionId, row: row });
  }
}
