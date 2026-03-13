import { Component } from '@angular/core';
import { TableColumn, TableConfig } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clarius Table Demo';

  columns: TableColumn[] = [
    { key: 'avatar', label: '', type: 'avatar', width: '50px' },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'progress', label: 'Progress', type: 'progress' },
    {
      key: 'actions',
      label: 'Actions',
      type: 'actions',
      actions: [
        { id: 'edit', label: 'Edit', icon: 'edit' },
        { id: 'delete', label: 'Delete', icon: 'delete' }
      ]
    }
  ];

  rows = [
    { avatar: 'https://i.pravatar.cc/40?img=1', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', progress: '85%' },
    { avatar: 'https://i.pravatar.cc/40?img=2', name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive', progress: '40%' },
    { avatar: 'https://i.pravatar.cc/40?img=3', name: 'Carol Lee', email: 'carol@example.com', status: 'Active', progress: '100%' },
    { avatar: 'https://i.pravatar.cc/40?img=4', name: 'David Park', email: 'david@example.com', status: 'Pending', progress: '10%' },
    { avatar: 'https://i.pravatar.cc/40?img=5', name: 'Eve Martinez', email: 'eve@example.com', status: 'Active', progress: '60%' }
  ];

  config: TableConfig = {
    selectable: false,
    pagination: false,
    stickyHeader: true
  };

  onRowClicked(row: any): void {
    console.log('Row clicked:', row);
  }

  onActionClicked(event: any): void {
    console.log('Action clicked:', event);
  }
}
