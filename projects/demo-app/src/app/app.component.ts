import { Component } from '@angular/core';
import { TableColumn } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // testbench table
  testbenchColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Hub Address' },
    { key: 'application', label: 'Application' },
    { key: 'availability', label: 'Availability', type: 'status' },
    { key: 'actions', label: 'Action', type: 'actions' }
  ];

  testbenchRows = [
    { name: 'PCI_Testbench_CEM', address: 'http://134.64.244.94:18000', application: 'PCIe', availability: 'PASS' },
    { name: 'PCI_Testbench_Base', address: 'http://134.64.244.94:18000', application: 'PCIe, USB 3', availability: 'FAIL' },
    { name: 'USB_Testbench', address: 'http://134.64.244.94:18000', application: 'USB 2, USB 3', availability: 'PASS' },
  ];

  testbenchActions = [{ id: 'modify', label: 'Modify' }, { id: 'delete', label: 'Delete' }];

  // instrument table
  instrumentColumns: TableColumn[] = [
    { key: 'name', label: 'Instrument Name' },
    { key: 'type', label: 'Type' },
    { key: 'subType', label: 'Sub Type' },
    { key: 'actions', label: 'Action', type: 'actions' }
  ];

  instrumentRows = [
    { name: 'Oscilloscope DPO7254', type: 'Measurement', subType: 'Scope' },
    { name: 'Signal Generator E8257D', type: 'Source', subType: 'RF Generator' },
    { name: 'Spectrum Analyzer N9020A', type: 'Measurement', subType: 'Spectrum' },
  ];

  instrumentActions = [{ id: 'configure', label: 'Configure' }, { id: 'remove', label: 'Remove' }];

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onActionClick(event: any) {
    console.log('Action clicked:', event);
  }
}
