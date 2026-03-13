import { Component } from '@angular/core';
import { TableColumn, TableConfig } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clarius Table Demo';

  // ──────────────────────────────────────────────
  // TABLE 1: Testbench Management
  // Shows: text columns, status badges with color callback, action buttons
  // ──────────────────────────────────────────────

  testbenchColumns: TableColumn[] = [
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

  testbenchRows = [
    { name: 'PCI_Testbench_CEM', hubAddress: 'http://134.64.244.94:18000', application: 'PCIe', availability: 'Available' },
    { name: 'PCI_Testbench_Base', hubAddress: 'http://134.64.244.94:18000', application: 'PCIe, USB 3', availability: 'Occupied by Amit...' },
    { name: 'USB_Testbench', hubAddress: 'http://134.64.244.94:18000', application: 'USB 2, USB 3', availability: 'Available' },
    { name: 'LDDR4_Testbench', hubAddress: 'http://134.64.244.94:18000', application: 'LDDR4 - Dualstack', availability: 'Available' },
    { name: 'Testbench - 127', hubAddress: 'http://134.64.244.94:18000', application: 'PCIe 3', availability: 'Available' }
  ];

  // ──────────────────────────────────────────────
  // TABLE 2: Test Reports
  // Shows: different columns, different actions (View/Export), progress column
  // Same <clarius-table> component, completely different data & layout
  // ──────────────────────────────────────────────

  reportColumns: TableColumn[] = [
    { key: 'reportId', label: 'Report ID', type: 'text', width: '100px' },
    { key: 'testName', label: 'Test Name', type: 'text' },
    { key: 'applications', label: 'Applications', type: 'text' },
    { key: 'progress', label: 'Progress', type: 'progress', width: '100px' },
    {
      key: 'status',
      label: 'Status',
      type: 'status',
      color: (row: any) => {
        const val = row['status'];
        if (val === 'Passed') return '#16a34a';
        if (val === 'Failed') return '#dc2626';
        if (val === 'Running') return '#2563eb';
        return '#666';
      }
    },
    {
      key: 'actions',
      label: '',
      type: 'actions',
      actions: [
        { id: 'view', label: 'View' },
        { id: 'export', label: 'Export' }
      ]
    }
  ];

  reportRows = [
    { reportId: '341', testName: 'Dell XCQ - 12', applications: 'LDDR4, USB, PCIe', progress: 100, status: 'Passed' },
    { reportId: '342', testName: 'Intel ZBoard - 5', applications: 'PCIe 3, USB 3', progress: 67, status: 'Running' },
    { reportId: '343', testName: 'AMD Versal - 8', applications: 'LDDR4', progress: 100, status: 'Failed' },
    { reportId: '344', testName: 'Xilinx KCU - 3', applications: 'USB 2, USB 3, PCIe', progress: 45, status: 'Running' }
  ];

  // ──────────────────────────────────────────────
  // TABLE 3: Instruments
  // Shows: more columns, different status values, custom widths
  // Demonstrates how the same component adapts to any data shape
  // ──────────────────────────────────────────────

  instrumentColumns: TableColumn[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'address', label: 'Service Address', type: 'text' },
    { key: 'technology', label: 'Technologies', type: 'text' },
    { key: 'application', label: 'Applications', type: 'text' },
    {
      key: 'connectivity',
      label: 'Connectivity',
      type: 'status',
      color: (row: any) => {
        const val = row['connectivity'];
        if (val === 'Available') return '#16a34a';
        if (val === 'Unavailable') return '#dc2626';
        if (val === 'In Use') return '#ea580c';
        return '#666';
      }
    },
    { key: 'lastValidated', label: 'Last Validated', type: 'text', width: '130px' },
    {
      key: 'actions',
      label: 'Actions',
      type: 'actions',
      width: '180px',
      actions: [
        { id: 'refresh', label: 'Refresh' },
        { id: 'export', label: 'Export' }
      ]
    }
  ];

  instrumentRows = [
    { name: 'Recorded test bench 777', address: '134.64.244.94:18000', technology: '-', application: '-', connectivity: 'Available', lastValidated: 'NA' },
    { name: 'PCI_Testbench_Base', address: '134.64.244.94:18000', technology: 'Tx PCIe Base...', application: 'Tx PCIe Base...', connectivity: 'Unavailable', lastValidated: '2 months ago' },
    { name: 'USB_Testbench', address: '134.64.244.94:18000', technology: 'Tx Display Port...', application: 'Tx Display Po...', connectivity: 'In Use', lastValidated: 'Not Validated' },
    { name: 'LDDR4_Testbench', address: '134.64.244.94:18000', technology: 'Tx USB', application: 'Tx USB Gen...', connectivity: 'Available', lastValidated: '3 days ago' }
  ];

  // ──────────────────────────────────────────────
  // Shared config & event handlers
  // ──────────────────────────────────────────────

  config: TableConfig = {
    selectable: false,
    pagination: false,
    stickyHeader: true
  };

  onRowClicked(tableName: string, row: any): void {
    console.log(`[${tableName}] Row clicked:`, row);
  }

  onActionClicked(tableName: string, event: any): void {
    console.log(`[${tableName}] Action clicked:`, event);
  }
}
