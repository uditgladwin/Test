import { Component } from '@angular/core';
import { TableColumn, CardColumn } from 'clarius-ui';

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
    { key: 'connectivity', label: 'Connectivity Status', type: 'status-text' },
    { key: 'lastValidated', label: 'Last Validated', type: 'status-dot' },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ];

  servicesRows = [
    { name: 'anir', address: 'http://10.233.237.70:18000', technologies: 'TX DisplayPort', applications: '-', connectivity: 'Available', lastValidated: 'Not Validated' },
    { name: 'DisplayPortTB3', address: 'http://10.233.237.3:18000', technologies: 'TX DisplayPort', applications: '-', connectivity: 'Unavailable', lastValidated: 'Not Validated' },
    { name: 'DPTB', address: 'http://10.233.237.82:18000', technologies: 'TX DisplayPort', applications: '-', connectivity: 'Available', lastValidated: 'Jan 29, 2026, 16:15:21' },
    { name: 'dual', address: 'http://10.233.236.171:18000', technologies: 'TX Base, TX Tech1', applications: '-', connectivity: 'Unavailable', lastValidated: 'Not Validated' },
    { name: 'fw_dual', address: 'http://10.233.237.233:18000', technologies: 'TX Base', applications: '-', connectivity: 'Available', lastValidated: 'Feb 23, 2026, 15:24:06' },
    { name: 'gff (Rec)', address: 'http://dgdf:18000', technologies: '-', applications: '-', connectivity: 'Unavailable', lastValidated: 'NA' },
    { name: 'Live_TB', address: 'http://10.233.237.69:18000', technologies: 'TX Base', applications: '-', connectivity: 'Unavailable', lastValidated: 'Not Validated' },
    { name: 'MOCK_DUALSTACK', address: 'http://10.233.237.233:18000', technologies: 'TX USB Mock', applications: '-', connectivity: 'Available', lastValidated: 'Not Validated' },
  ];

  servicesStatusColors = { 'Available': '#00B35D', 'Unavailable': '#FF3B30', 'In Use': '#FFD600' };
  servicesLastValidatedColors = { 'Jan 29, 2026, 16:15:21': '#00B35D', 'Feb 23, 2026, 15:24:06': '#00B35D' };
  servicesActions = [
    { id: 'validate', label: '', icon: 'assets/icons/validate.png' },
    { id: 'edit', label: '', icon: 'assets/icons/edit.png' },
    { id: 'delete', label: '', icon: 'assets/icons/delete.png' }
  ];

  // --- Table 4: Generated Reports (flat layout, delete icon + View button) ---

  reportColumns: TableColumn[] = [
    { key: 'reportName', label: 'Report Name' },
    { key: 'testName', label: 'Test Name' },
    { key: 'applications', label: 'Applications' },
    { key: 'createdOn', label: 'Created On' },
    { key: 'actions', label: '', type: 'actions' }
  ];

  reportRows = [
    { reportName: 'testing', testName: 'dontDelete3', applications: 'TKFWTXS04', createdOn: 'Feb 24, 10:01:09' },
    { reportName: 'AshokTesting', testName: 'Run_02', applications: 'TKFWTXS04', createdOn: 'Feb 13, 17:16:29' },
    { reportName: 'test_check', testName: 'test_18', applications: 'TKFWTXS04', createdOn: 'Jan 19, 18:22:23' },
    { reportName: 'dssdsdsd', testName: 'test_plots_2', applications: 'TKFWTXS08', createdOn: 'Dec 09, 14:49:42' },
    { reportName: 'sdssdssdworking', testName: 'sampleusb', applications: 'TKFWTXS06', createdOn: 'Dec 04, 22:54:57' },
  ];

  reportActions = [
    { id: 'delete', label: '', icon: 'assets/icons/delete.png' },
    { id: 'view', label: 'View', primary: true }
  ];

  // --- Table 5: List of Tests (checkbox + colored status text + View Results button) ---

  testColumns: TableColumn[] = [
    { key: 'select', label: '', type: 'checkbox' },
    { key: 'testName', label: 'Test Name' },
    { key: 'testMode', label: 'Test Mode' },
    { key: 'applications', label: 'Applications' },
    { key: 'dateAdded', label: 'Date Added' },
    { key: 'duration', label: 'Duration' },
    { key: 'status', label: 'Status', type: 'status-text' },
    { key: 'actions', label: '', type: 'actions' }
  ];

  testRows = [
    { testName: 'qwrewtry', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:48:31', duration: 'Less than 1 min', status: 'Failed' },
    { testName: 'qwewtbta', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:45:42', duration: 'Less than 1 min', status: 'Failed' },
    { testName: 'efggf', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:41:50', duration: 'Less than 1 min', status: 'Failed' },
    { testName: 'wrwwewrwe', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:39:02', duration: 'Less than 1 min', status: 'Failed' },
    { testName: 'erlvbdldldb', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:36:25', duration: 'Less than 1 min', status: 'Passed' },
  ];

  testStatusColors = { 'Failed': '#FF3B30', 'Passed': '#00B35D', 'Draft': '#B1B1B1' };
  testActions = [{ id: 'viewResults', label: 'View Results', primary: true }];

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
