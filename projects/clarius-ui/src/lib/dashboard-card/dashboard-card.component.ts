import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardColumn } from './dashboard-card.model';

@Component({
  selector: 'clarius-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class ClariusDashboardCardComponent {
  @Input() title = '';
  @Input() headerLink = false;
  @Input() headerBackground = '';
  @Input() columns: CardColumn[] = [];
  @Input() rows: any[] = [];
  @Input() statusColors: { [value: string]: string } = {};
  @Input() emptyMessage = '';
  @Input() showColumnHeaders = false;
  @Output() headerClicked = new EventEmitter<void>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() linkClicked = new EventEmitter<{ column: string; row: any }>();

  getStatusColor(value: string): string {
    return this.statusColors[value] || '#FFFFFF';
  }

  onLinkClick(column: string, row: any, event: MouseEvent) {
    event.stopPropagation();
    this.linkClicked.emit({ column: column, row: row });
  }
}
