export interface NotificationItem {
  id: string;
  title?: string;
  message: string;
  time?: string;
  notificationType?: 'SYSTEM' | 'USER';
  possibleActions?: string[];
}
