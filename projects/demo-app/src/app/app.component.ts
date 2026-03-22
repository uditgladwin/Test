import { Component } from '@angular/core';
import { TableColumn, CardColumn } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // --- Table 1: Sequences (Name, Application, Modify/Delete buttons — some rows dimmed/disabled) ---

  sequenceTableColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'application', label: 'Application' },
    { key: 'actions', label: 'Action', type: 'actions' }
  ];

  sequenceTableRows = [
    { name: 'test1_02', application: 'TKFWTXS05' },
    { name: 'SequenceTest_BackCom...', application: 'TKFWTXS04' },
    { name: 'SequenceTest_BackCom...', application: 'TKFWTXS05', _dimmed: true },
    { name: 'SequenceTest_BackCom...', application: 'TKFWRXS17', _dimmed: true },
    { name: 'SequenceTest_BackCom...', application: 'TKFWTXS18' },
    { name: 'SequenceTest_BackCom...', application: 'TKFWTXS03, TKFWTXS07' },
    { name: 'xcvsd', application: 'TKFWTXS06' },
  ];

  sequenceTableActions = [
    { id: 'modify', label: 'Modify', disabledField: '_dimmed', disabledValue: true },
    { id: 'delete', label: 'Delete' }
  ];

  // --- Table 1b: Applications (Name, Type, Sub-type, Version — first row bold, rest dimmed) ---

  applicationColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'subType', label: 'Sub-type' },
    { key: 'version', label: 'Version' }
  ];

  applicationRows = [
    { name: 'UD sample app', type: 'TX Base', subType: 'Version0', version: '1.0' },
    { name: 'Compliance_mode', type: 'TX Base', subType: 'Version0', version: '1.0', _dimmed: true },
    { name: 'Default_Compliance_mode', type: 'TX Base', subType: 'Version0', version: '1.0', _dimmed: true },
    { name: 'Default_User_Defined_mode', type: 'TX Base', subType: 'Version0', version: '1.0', _dimmed: true },
    { name: 'DisplayPort TX14 HBR', type: 'TX DisplayPort', subType: 'HBR', version: '4.0.0', _dimmed: true },
    { name: 'DisplayPort TX14 HBR2', type: 'TX DisplayPort', subType: 'HBR2', version: '4.0.0', _dimmed: true },
    { name: 'ManualCursorApp', type: 'TX Base', subType: 'Version0', version: '1.0', _dimmed: true },
    { name: 'MultiAnalysisApp1', type: 'TX Base', subType: 'Version0', version: '1.0', _dimmed: true },
    { name: 'MultiAnalysisApp2', type: 'TX Base', subType: 'Version0', version: '1.0', _dimmed: true },
  ];

  // --- Table 2: Test Benches (matching actual platform — name, address, tech, app, availability, last validated, action icons) ---

  testbenchColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Hub Address' },
    { key: 'technologies', label: 'Technologies' },
    { key: 'applications', label: 'Applications' },
    { key: 'availability', label: 'Availability', type: 'status-text' },
    { key: 'lastValidated', label: 'Last Validated', type: 'status-dot' },
    { key: 'actions', label: '', type: 'actions' }
  ];

  testbenchRows = [
    { name: 'anir', address: 'http://10.233.237.70:18000', technologies: 'TX DisplayPort', applications: '-', availability: 'Available', lastValidated: 'Not Validated' },
    { name: 'DisplayPortTB3', address: 'http://10.233.237.3:18000', technologies: 'TX DisplayPort', applications: '-', availability: 'Unavailable', lastValidated: 'Not Validated' },
    { name: 'DPTB', address: 'http://10.233.237.82:18000', technologies: 'TX DisplayPort', applications: '-', availability: 'Available', lastValidated: 'Jan 29, 2026, 16:15:21' },
    { name: 'dual', address: 'http://10.233.236.171:18000', technologies: 'TX Base, TX ...', applications: '-', availability: 'Available', lastValidated: 'Not Validated' },
    { name: 'fw_dual', address: 'http://10.233.237.233:18000', technologies: 'TX Base', applications: '-', availability: 'Available', lastValidated: 'Feb 23, 2026, 15:24:06' },
    { name: 'gff (Rec)', address: 'http://dgdf:18000', technologies: '-', applications: '-', availability: 'Unavailable', lastValidated: 'NA' },
    { name: 'Live_TB', address: 'http://10.233.237.69:18000', technologies: 'TX Base', applications: '-', availability: 'Unavailable', lastValidated: 'Not Validated' },
    { name: 'MOCK_DUALSTACK', address: 'http://10.233.237.233:18000', technologies: 'TX USB Mock', applications: '-', availability: 'Available', lastValidated: 'Not Validated' },
    { name: 'new_one', address: 'http://tek-2md2422ql0:18000', technologies: 'TX Base', applications: 'MultiAnalysis...', availability: 'Unavailable', lastValidated: 'Not Validated' },
    { name: 'new_tb_nikita (Rec)', address: 'http://tek-2md2422ql0:18000', technologies: '-', applications: '-', availability: 'Unavailable', lastValidated: 'NA' },
  ];

  testbenchStatusColors: { [key: string]: string } = {
    'Available': '#00B35D', 'Unavailable': '#FF3B30',
    'Jan 29, 2026, 16:15:21': '#FF3B30', 'Feb 23, 2026, 15:24:06': '#FF3B30'
  };
  testbenchActions = [
    { id: 'validate', label: '', icon: '\u2714' },
    { id: 'edit', label: '', icon: '\u270E' },
    { id: 'delete', label: '', icon: '\u{1F5D1}' }
  ];

  // (Instrument Services table removed — merged into Test Benches above)

  // --- Table 4: Reports (matching actual platform — gradient bg, column headers, delete icon, View button with conditional styling) ---

  reportColumns: TableColumn[] = [
    { key: 'reportName', label: 'Report Name' },
    { key: 'testName', label: 'Test Name' },
    { key: 'applications', label: 'Applications' },
    { key: 'createdOn', label: 'Created On' },
    { key: 'actions', label: '', type: 'actions' }
  ];

  reportRows = [
    { reportName: 'testing', testName: 'dontDelete3', applications: 'TKFWTXS04', createdOn: 'Feb 24, 10:01:09', status: 'PASS' },
    { reportName: 'AshokTesting', testName: 'Run_02', applications: 'TKFWTXS04', createdOn: 'Feb 13, 17:16:29', status: 'PASS' },
    { reportName: 'test_check', testName: 'test_18', applications: 'TKFWTXS04', createdOn: 'Jan 19, 18:22:23', status: 'PASS' },
    { reportName: 'dssdsdsd', testName: 'test_plots_2', applications: 'TKFWTXS08', createdOn: 'Dec 09, 14:49:42', status: 'PASS' },
    { reportName: 'sdssdssdworking', testName: 'sampleusb', applications: 'TKFWTXS06', createdOn: 'Dec 04, 22:54:57', status: 'PASS' },
    { reportName: 'sdssdssd56', testName: 'sampleusb', applications: 'TKFWTXS06', createdOn: 'Dec 04, 22:50:05', status: 'FAIL' },
    { reportName: 'sdssdssd', testName: 'sampleusb', applications: 'TKFWTXS06', createdOn: 'Dec 04, 22:48:37', status: 'PASS' },
  ];

  reportActions = [
    { id: 'delete', label: '', icon: '\u{1F5D1}' },
    { id: 'view', label: 'View', primaryField: 'status', primaryValue: 'PASS' }
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
    { testName: 'efggf', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:41:59', duration: 'Less than 1 min', status: 'Failed' },
    { testName: 'wrwwewrwe', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:39:02', duration: 'Less than 1 min', status: 'Failed' },
    { testName: 'erfvfbdfdffdb', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 11, 12:36:25', duration: 'Less than 1 min', status: 'Passed' },
    { testName: 'dddddswe32wdz...', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 09, 14:31:08', duration: 'Less than 1 min', status: 'Failed' },
    { testName: 'fddfsdtdsf', testMode: 'NA', applications: 'TKFWTXS04', dateAdded: 'Mar 09, 14:25:40', duration: 'Less than 1 min', status: 'Passed' },
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
