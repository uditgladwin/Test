import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clarius-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class ClariusDashboardComponent {
  @Input() greeting = '';
  @Input() actionLabel = '';
  @Input() actionIcon = '';
  @Output() actionClicked = new EventEmitter<void>();
}
