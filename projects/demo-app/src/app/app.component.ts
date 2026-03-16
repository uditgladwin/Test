import { Component } from '@angular/core';
import { TableColumn } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // --- Table 1: Instrument table (simple — text + buttons) ---

  instrumentColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'subType', label: 'Sub-type' },
    { key: 'actions', label: 'Action', type: 'actions' }
  ];

  instrumentRows = [
    { name: 'Scope 1', type: 'TCPIP::10.0.0.2::INSTR', subType: 'Signal Analyzer' },
    { name: 'Scope 2', type: 'TCPIP::10.0.0.3::INSTR', subType: 'Signal Analyzer' },
    { name: 'Scope 3', type: 'TCPIP::10.0.0.4::INSTR', subType: 'Signal Analyzer' },
    { name: 'Scope 4', type: 'TCPIP::10.0.0.5::INSTR', subType: 'Signal Analyzer' },
    { name: 'Scope 5', type: 'TCPIP::10.0.0.6::INSTR', subType: 'Signal Analyzer' },
  ];

  instrumentActions = [{ id: 'modify', label: 'Modify' }, { id: 'delete', label: 'Delete' }];

  // --- Table 2: Testbench table (text + status badges + buttons) ---

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
    { name: 'LDDR4_Testbench', address: 'http://134.64.244.94:18000', application: 'LDDR4 - Dualstack', availability: 'Available' },
  ];

  testbenchStatusColors = { 'Available': '#00B35D', 'Occupied': '#FF3B30' };
  testbenchActions = [{ id: 'modify', label: 'Modify' }, { id: 'delete', label: 'Delete' }];

  // --- Table 3: Instrument Services (text + colored status + icon actions) ---

  servicesColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Instrument Service Address' },
    { key: 'technologies', label: 'Technologies' },
    { key: 'applications', label: 'Applications' },
    { key: 'connectivity', label: 'Connectivity Status', type: 'status' },
    { key: 'lastValidated', label: 'Last Validated' },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ];

  servicesRows = [
    { name: 'Recorded test bench 777 (Rec)', address: '134.64.244.94:18000', technologies: '-', applications: '-', connectivity: 'Available', lastValidated: 'NA' },
    { name: 'PCI_Testbench_Base', address: '134.64.244.94:18000', technologies: 'Tx PCIe Base...', applications: 'Tx PCIe Base...', connectivity: 'Unavailable', lastValidated: '2 months ago' },
    { name: 'USB_Testbench', address: '134.64.244.94:18000', technologies: 'Tx Display Port...', applications: 'Tx Display Po...', connectivity: 'In Use', lastValidated: 'Not Validated' },
    { name: 'LDDR4_Testbench', address: '134.64.244.94:18000', technologies: 'Tx USB', applications: 'Tx USB Gen...', connectivity: 'Available', lastValidated: '3 days ago' },
  ];

  servicesStatusColors = { 'Available': '#00B35D', 'Unavailable': '#FF3B30', 'In Use': '#FFD600' };
  servicesActions = [
    { id: 'sync', label: '', icon: '\u21BB' },
    { id: 'edit', label: '', icon: '\u270E' },
    { id: 'menu', label: '', icon: '\u22EE' }
  ];

  // --- Table 4: Generated Reports (gradient bg + label/value pairs + primary buttons) ---

  reportColumns: TableColumn[] = [
    { key: 'reportId', label: 'Report ID' },
    { key: 'testName', label: 'Test Name' },
    { key: 'applications', label: 'Applications' },
    { key: 'dateAdded', label: 'Date Added' },
    { key: 'actions', label: '', type: 'actions' }
  ];

  reportRows = [
    { reportId: '341', testName: 'Dell XCQ - 12', applications: 'LDDR4, USB, PCIe', dateAdded: 'May 13, 03:40:00' },
    { reportId: '341', testName: 'Dell XCQ - 12', applications: 'LDDR4, USB, PCIe', dateAdded: 'May 13, 03:40:00' },
    { reportId: '341', testName: 'Dell XCQ - 12', applications: 'LDDR4, USB, PCIe', dateAdded: 'May 13, 03:40:00' },
    { reportId: '341', testName: 'Dell XCQ - 12', applications: 'LDDR4, USB, PCIe', dateAdded: 'May 13, 03:40:00' },
    { reportId: '341', testName: 'Dell XCQ - 12', applications: 'LDDR4, USB, PCIe', dateAdded: 'May 13, 03:40:00' },
  ];

  reportActions = [
    { id: 'delete', label: '', icon: '\uD83D\uDDD1' },
    { id: 'view', label: 'View' },
    { id: 'export', label: 'Export', primary: true }
  ];

  // --- Events ---

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onActionClick(event: any) {
    console.log('Action clicked:', event);
  }
}
