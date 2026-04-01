import { Component, OnInit } from '@angular/core';
import { TableColumn, ClariusDataService, NotificationItem } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // --- Table data (loaded from API) ---
  sequenceTable: any = { columns: [], rows: [], actions: [], statusColors: {} };
  applicationTable: any = { columns: [], rows: [], actions: [], statusColors: {} };
  testbenchTable: any = { columns: [], rows: [], actions: [], statusColors: {} };
  reportTable: any = { columns: [], rows: [], actions: [], statusColors: {} };
  testTable: any = { columns: [], rows: [], actions: [], statusColors: {} };

  // --- Dashboard card data (loaded from API) ---
  sequenceCard: any = { columns: [], rows: [], statusColors: {} };
  testBenchCard: any = { columns: [], rows: [], statusColors: {} };
  failedTestCard: any = { columns: [], rows: [], statusColors: {} };
  appCard: any = { columns: [], rows: [], statusColors: {} };

  // --- Notification card data ---
  notifications: NotificationItem[] = [];

  constructor(private dataService: ClariusDataService) {}

  ngOnInit() {
    // Load table data from API (JSON files simulate real API endpoints)
    this.dataService.fetch({ url: 'assets/data/sequences-table.json' })
      .subscribe(data => this.sequenceTable = data);

    this.dataService.fetch({ url: 'assets/data/applications-table.json' })
      .subscribe(data => this.applicationTable = data);

    this.dataService.fetch({ url: 'assets/data/testbenches-table.json' })
      .subscribe(data => this.testbenchTable = data);

    this.dataService.fetch({ url: 'assets/data/reports-table.json' })
      .subscribe(data => this.reportTable = data);

    this.dataService.fetch({ url: 'assets/data/tests-table.json' })
      .subscribe(data => this.testTable = data);

    // Load dashboard card data from API
    this.dataService.fetch({ url: 'assets/data/sequences-card.json' })
      .subscribe(data => this.sequenceCard = data);

    this.dataService.fetch({ url: 'assets/data/testbenches-card.json' })
      .subscribe(data => this.testBenchCard = data);

    this.dataService.fetch({ url: 'assets/data/failed-tests-card.json' })
      .subscribe(data => this.failedTestCard = data);

    this.dataService.fetch({ url: 'assets/data/applications-card.json' })
      .subscribe(data => this.appCard = data);

    // Load notification data from API
    this.dataService.fetch({ url: 'assets/data/notifications.json' })
      .subscribe((data: any) => this.notifications = data.notifications || []);
  }

  // --- Events ---

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onActionClick(event: any) {
    console.log('Action clicked:', event);
  }

  onSelectionChange(selected: any[]) {
    console.log('Selection changed:', selected);
  }

  onHeaderClick(card: string) {
    console.log('Header arrow clicked:', card);
  }

  onLinkClick(event: any) {
    console.log('Link clicked:', event);
  }

  onClearAllNotifications() {
    console.log('Clear all notifications');
    this.notifications = [];
  }

  onNotificationClosed(event: { id: string }) {
    console.log('Notification closed:', event);
    this.notifications = this.notifications.filter(n => n.id !== event.id);
  }

  onNotificationAction(event: { id: string; action: string }) {
    console.log('Notification action:', event);
    this.notifications = this.notifications.filter(n => n.id !== event.id);
  }
}
