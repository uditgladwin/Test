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
  @Input() showLabels = false;
  @Input() gradient = false;
  @Input() statusDots = false;
  @Output() rowClicked = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();

  getStatusColor(value: string): string {
    return this.statusColors[value] || '#FFFFFF';
  }

  getStatusBackground(value: string): string {
    const hex = this.statusColors[value];
    if (!hex) return 'transparent';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',0.1)';
  }

  getStatusBorder(value: string): string {
    const hex = this.statusColors[value];
    if (!hex) return 'transparent';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return '1px solid rgba(' + r + ',' + g + ',' + b + ',0.2)';
  }

  onActionClick(actionId: string, row: any, event: MouseEvent) {
    event.stopPropagation();
    this.actionClicked.emit({ action: actionId, row: row });
  }
}
