import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableColumn, TableAction } from '../models/table-column.model';
import { ButtonSize } from '../../button/button.enums';

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
  @Input() borderGradient = false;
  @Output() rowClicked = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();
  @Output() selectionChanged = new EventEmitter<any[]>();

  selectedRows: Set<any> = new Set();

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

  getButtonSize(action: TableAction): ButtonSize {
    return action.size === 'small' ? ButtonSize.Small : ButtonSize.Large;
  }

  onActionClick(actionId: string, row: any, event: MouseEvent) {
    event.stopPropagation();
    this.actionClicked.emit({ action: actionId, row: row });
  }

  onActionButtonClick(actionId: string, row: any) {
    this.actionClicked.emit({ action: actionId, row: row });
  }

  isSelected(row: any): boolean {
    return this.selectedRows.has(row);
  }

  get allSelected(): boolean {
    return this.rows.length > 0 && this.selectedRows.size === this.rows.length;
  }

  toggleRow(row: any, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.selectionChanged.emit(Array.from(this.selectedRows));
  }

  toggleAll(event: MouseEvent) {
    event.stopPropagation();
    if (this.allSelected) {
      this.selectedRows.clear();
    } else {
      this.rows.forEach(r => this.selectedRows.add(r));
    }
    this.selectionChanged.emit(Array.from(this.selectedRows));
  }
}
