import { Component } from '@angular/core';
import { TableColumn, CardColumn } from 'clarius-ui';
import { ButtonState, ButtonSize, ButtonIconMode } from 'clarius-ui';

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
    { id: 'validate', label: '', icon: 'assets/icons/validate.png' },
    { id: 'edit', label: '', icon: 'assets/icons/edit.png' },
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
    { id: 'delete', label: '', icon: 'assets/icons/delete.png' },
    { id: 'view', label: 'View' },
    { id: 'export', label: 'Export', primary: true }
  ];

  // --- Table 5: List of Tests (checkbox + colored status text) ---

  testColumns: TableColumn[] = [
    { key: 'select', label: '', type: 'checkbox' },
    { key: 'testName', label: 'Test Name' },
    { key: 'tag', label: 'Tag' },
    { key: 'applications', label: 'Applications' },
    { key: 'dateAdded', label: 'Date Added' },
    { key: 'status', label: 'Status', type: 'status' }
  ];

  testRows = [
    { testName: 'qwrewtry', tag: 'Default', applications: 'MultiAnalysisApp2', dateAdded: 'Mar 11, 12:48:31', status: 'Failed' },
    { testName: 'qwewtbta', tag: 'Default', applications: 'MultiAnalysisApp2', dateAdded: 'Mar 11, 12:45:42', status: 'Failed' },
    { testName: 'efggf', tag: 'Default', applications: 'MultiAnalysisApp2', dateAdded: 'Mar 11, 12:41:59', status: 'Failed' },
    { testName: 'wrwwewrwe', tag: 'Default', applications: 'MultiAnalysisApp2', dateAdded: 'Mar 11, 12:39:02', status: 'Failed' },
  ];

  testStatusColors = { 'Failed': '#FF3B30', 'Passed': '#00B35D' };

  // Expose button enums to template
  ButtonState = ButtonState;
  ButtonSize = ButtonSize;
  ButtonIconMode = ButtonIconMode;

  // --- Dashboard Card 1: Sequences (title + arrow, 3 cols with LAUNCH link) ---

  sequenceColumns: CardColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'id', label: 'ID' },
    { key: 'launch', label: '', type: 'link', linkText: 'LAUNCH' }
  ];

  sequenceRows = [
    { name: 'test1_02', id: 'TKFWTXS05' },
    { name: 'SequenceTes...', id: 'TKFWTXS04' },
    { name: 'SequenceTes...', id: 'TKFWTXS18' },
    { name: 'SequenceTes...', id: 'TKFWTXS03' },
    { name: 'xcvsd', id: 'TKFWTXS06' },
  ];

  // --- Dashboard Card 2: Test Benches (title + arrow, name + dot) ---

  testBenchCardColumns: CardColumn[] = [
    { key: 'name' },
    { key: 'status', type: 'dot' }
  ];

  testBenchCardRows = [
    { name: 'anir', status: 'Online' },
    { name: 'DisplayPortTB3', status: 'Offline' },
    { name: 'DPTB', status: 'Online' },
    { name: 'dual', status: 'Offline' },
    { name: 'fw_dual', status: 'Offline' },
  ];

  testBenchDotColors = { 'Online': '#00B35D', 'Offline': '#FF3B30' };

  // --- Dashboard Card 3: Failed Tests (red header, 4 cols with progress) ---

  failedTestColumns: CardColumn[] = [
    { key: 'test', label: 'Test' },
    { key: 'testBench', label: 'TestBench' },
    { key: 'scope', label: 'Scope' },
    { key: 'progress', label: 'Progress', type: 'progress' }
  ];

  failedTestRows = [
    { test: 'qwrewtry', testBench: 'newRecTestbench', scope: '', progress: '100%', progressStatus: 'Failed' },
    { test: 'qwewtbta', testBench: 'newRecTestbench', scope: '', progress: '100%', progressStatus: 'Failed' },
    { test: 'efggf', testBench: 'newRecTestbench', scope: '', progress: '100%', progressStatus: 'Failed' },
    { test: 'wrwwewrwe', testBench: 'newRecTestbench', scope: '', progress: '100%', progressStatus: 'Failed' },
  ];

  failedTestStatusColors = { 'Failed': '#FF3B30' };

  // --- Dashboard Card 4: Applications (title + arrow, name + LAUNCH link) ---

  appColumns: CardColumn[] = [
    { key: 'name' },
    { key: 'launch', type: 'link', linkText: 'LAUNCH' }
  ];

  appRows = [
    { name: 'UD sample app' },
  ];

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
}
