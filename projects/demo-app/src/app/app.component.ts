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
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'hubAddress', label: 'Hub Address', type: 'text' },
    { key: 'application', label: 'Application', type: 'text' },
    {
      key: 'availability',
      label: 'Availability',
      type: 'status',
      color: (row: any) => {
        const val = row['availability'];
        if (val === 'Available') return '#16a34a';
        if (val && val.startsWith('Occupied')) return '#dc2626';
        if (val === 'In Use') return '#ea580c';
        return '#666';
      }
    },
    {
      key: 'actions',
      label: 'Action',
      type: 'actions',
      actions: [
        { id: 'modify', label: 'Modify' },
        { id: 'delete', label: 'Delete' }
      ]
    }
  ];

  rows = [
    { name: 'PCI_Testbench_CEM', hubAddress: 'http://134.64.244.94.18000', application: 'PCIe', availability: 'Available' },
    { name: 'PCI_Testbench_Base', hubAddress: 'http://134.64.244.94.18000', application: 'PCIe, USB 3', availability: 'Occupied by Amit...' },
    { name: 'USB_Testbench', hubAddress: 'http://134.64.244.94.18000', application: 'USB 2, USB 3', availability: 'Available' },
    { name: 'LDDR4_Testbench', hubAddress: 'http://134.64.244.94.18000', application: 'LDDR4 - Dualstack', availability: 'Available' },
    { name: 'Testbench - 127', hubAddress: 'http://134.64.244.94.18000', application: 'PCIe 3', availability: 'Available' }
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
