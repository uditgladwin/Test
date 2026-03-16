import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableColumn, TableAction } from '../models/table-column.model';

@Component({
  selector: 'clarius-table',
  templateUrl: './clarius-table.component.html',
  styleUrls: ['./clarius-table.component.css'],
})
export class ClariusTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() statusColors: { [value: string]: string } = {};
  @Output() rowClicked = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();

  getStatusColor(value: string): string {
    return this.statusColors[value] || '#FFFFFF';
  }

  onActionClick(actionId: string, row: any, event: MouseEvent) {
    event.stopPropagation();
    this.actionClicked.emit({ action: actionId, row: row });
  }
}
