import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotificationItem } from './notification.model';

@Component({
  selector: 'clarius-notification-card',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationCardComponent {
  @Input() notifications: NotificationItem[] = [];
  @Input() emptyMessage = 'There are no notifications to display.';

  @Output() clearAllClicked = new EventEmitter<void>();
  @Output() itemClosed = new EventEmitter<{ id: string }>();
  @Output() actionClicked = new EventEmitter<{ id: string; action: string }>();

  get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  onClearAll(): void {
    this.clearAllClicked.emit();
  }

  onCloseItem(notification: NotificationItem): void {
    this.itemClosed.emit({ id: notification.id });
  }

  onActionClick(notification: NotificationItem, action: string): void {
    this.actionClicked.emit({ id: notification.id, action });
  }

  isCloseable(notification: NotificationItem): boolean {
    return !notification.possibleActions
      || notification.possibleActions.length === 0
      || (notification.possibleActions.length === 1 && notification.possibleActions[0] === 'CLEAR');
  }

  isSystemType(notification: NotificationItem): boolean {
    return notification.notificationType === 'SYSTEM';
  }

  hasActions(notification: NotificationItem): boolean {
    return !!notification.possibleActions
      && notification.possibleActions.length > 0
      && !(notification.possibleActions.length === 1 && notification.possibleActions[0] === 'CLEAR');
  }

  getTimeDisplay(time: string): string {
    if (!time) return '';
    const now = new Date();
    const notifDate = new Date(time);
    if (isNaN(notifDate.getTime())) return time;

    const diffMs = now.getTime() - notifDate.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours >= 1) {
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      return new Intl.DateTimeFormat('en-US', options).format(notifDate);
    }
    return diffMinutes + ' minute(s) ago';
  }
}
