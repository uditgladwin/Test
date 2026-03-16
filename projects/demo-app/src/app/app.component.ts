import { Component } from '@angular/core';
import { TableColumn } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // ---- TABLE 1: Testbench list ----

  testbenchColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Hub Address' },
    { key: 'application', label: 'Application' },
    { key: 'availability', label: 'Availability', type: 'status' },
    { key: 'actions', label: 'Action', type: 'actions' }
  ];

  testbenchRows = [
    { name: 'PCI_Testbench_CEM', address: 'http://134.64.244.94:18000', application: 'PCIe', availability: 'Available' },
    { name: 'PCI_Testbench_Base', address: 'http://134.64.244.94:18000', application: 'PCIe, USB 3', availability: 'Occupied' },
    { name: 'USB_Testbench', address: 'http://134.64.244.94:18000', application: 'USB 2, USB 3', availability: 'Available' },
  ];

  testbenchStatusColors = { 'Available': 'green', 'Occupied': 'red', 'In Use': 'orange' };
  testbenchActions = [{ id: 'modify', label: 'Modify' }, { id: 'delete', label: 'Delete' }];

  // ---- TABLE 2: Reports ----

  reportColumns: TableColumn[] = [
    { key: 'id', label: 'Report ID' },
    { key: 'testName', label: 'Test Name' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'actions', label: '', type: 'actions' }
  ];

  reportRows = [
    { id: '341', testName: 'Dell XCQ - 12', status: 'Passed' },
    { id: '342', testName: 'Intel ZBoard - 5', status: 'Running' },
    { id: '343', testName: 'AMD Versal - 8', status: 'Failed' },
  ];

  reportStatusColors = { 'Passed': 'green', 'Failed': 'red', 'Running': 'blue' };
  reportActions = [{ id: 'view', label: 'View' }, { id: 'export', label: 'Export' }];

  // ---- Event handlers ----

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onActionClick(event: any) {
    console.log('Action clicked:', event);
  }
}
