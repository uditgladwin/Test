import { Component } from '@angular/core';
import { TableColumn, TableConfig } from 'clarius-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clarius Table — Component Showcase';

  config: TableConfig = {};

  // ──────────────────────────────────────────────
  // 1. TEXT — plain text rendering
  // ──────────────────────────────────────────────

  textColumns: TableColumn[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'role', label: 'Role', type: 'text' }
  ];

  textRows = [
    { name: 'Alice Johnson', email: 'alice@clarius.io', role: 'Engineer' },
    { name: 'Bob Smith', email: 'bob@clarius.io', role: 'Manager' },
    { name: 'Carol Davis', email: 'carol@clarius.io', role: 'Designer' }
  ];

  // ──────────────────────────────────────────────
  // 2. STATUS — colored badge pills via color callback
  // ──────────────────────────────────────────────

  statusColumns: TableColumn[] = [
    { key: 'device', label: 'Device', type: 'text' },
    {
      key: 'status',
      label: 'Status',
      type: 'status',
      color: (row: any) => {
        const val = row['status'];
        if (val === 'Online') return '#16a34a';
        if (val === 'Offline') return '#dc2626';
        if (val === 'Standby') return '#ea580c';
        return '#666';
      }
    }
  ];

  statusRows = [
    { device: 'Server Alpha', status: 'Online' },
    { device: 'Server Beta', status: 'Offline' },
    { device: 'Server Gamma', status: 'Standby' },
    { device: 'Server Delta', status: 'Online' }
  ];

  // ──────────────────────────────────────────────
  // 3. PROGRESS — renders value with % suffix
  // ──────────────────────────────────────────────

  progressColumns: TableColumn[] = [
    { key: 'task', label: 'Task', type: 'text' },
    { key: 'progress', label: 'Completion', type: 'progress' }
  ];

  progressRows = [
    { task: 'PCIe Compliance Test', progress: 100 },
    { task: 'USB Signal Integrity', progress: 67 },
    { task: 'DDR4 Validation', progress: 45 },
    { task: 'Display Port Calibration', progress: 12 }
  ];

  // ──────────────────────────────────────────────
  // 4. ACTIONS — rendered as outlined buttons
  // ──────────────────────────────────────────────

  actionsColumns: TableColumn[] = [
    { key: 'name', label: 'Item', type: 'text' },
    {
      key: 'actions',
      label: 'Actions',
      type: 'actions',
      actions: [
        { id: 'view', label: 'View' },
        { id: 'edit', label: 'Edit' },
        { id: 'delete', label: 'Delete' }
      ]
    }
  ];

  actionsRows = [
    { name: 'Report #341' },
    { name: 'Report #342' },
    { name: 'Report #343' }
  ];

  // ──────────────────────────────────────────────
  // 5. AVATAR — circular image from URL
  // ──────────────────────────────────────────────

  avatarColumns: TableColumn[] = [
    { key: 'avatar', label: 'Photo', type: 'avatar', width: '80px' },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'department', label: 'Department', type: 'text' }
  ];

  avatarRows = [
    { avatar: 'https://i.pravatar.cc/64?img=1', name: 'Alice Johnson', department: 'Engineering' },
    { avatar: 'https://i.pravatar.cc/64?img=2', name: 'Bob Smith', department: 'Design' },
    { avatar: 'https://i.pravatar.cc/64?img=3', name: 'Carol Davis', department: 'QA' }
  ];

  // ──────────────────────────────────────────────
  // 6. ICON — renders via column.icon callback
  // ──────────────────────────────────────────────

  iconColumns: TableColumn[] = [
    {
      key: 'icon',
      label: 'Type',
      type: 'icon',
      width: '60px',
      icon: (row: any) => {
        const map: Record<string, string> = { file: '📄', folder: '📁', image: '🖼️' };
        return map[row['kind']] || '❓';
      }
    },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'size', label: 'Size', type: 'text' }
  ];

  iconRows = [
    { kind: 'file', name: 'report.pdf', size: '2.4 MB' },
    { kind: 'folder', name: 'test-results', size: '—' },
    { kind: 'image', name: 'screenshot.png', size: '1.1 MB' }
  ];

  // ──────────────────────────────────────────────
  // 7. COMBINED — all types in one table
  // ──────────────────────────────────────────────

  combinedColumns: TableColumn[] = [
    { key: 'avatar', label: '', type: 'avatar', width: '60px' },
    { key: 'name', label: 'Name', type: 'text' },
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
      label: 'Actions',
      type: 'actions',
      actions: [
        { id: 'view', label: 'View' },
        { id: 'export', label: 'Export' }
      ]
    }
  ];

  combinedRows = [
    { avatar: 'https://i.pravatar.cc/64?img=10', name: 'Dell XCQ - 12', progress: 100, status: 'Passed' },
    { avatar: 'https://i.pravatar.cc/64?img=11', name: 'Intel ZBoard - 5', progress: 67, status: 'Running' },
    { avatar: 'https://i.pravatar.cc/64?img=12', name: 'AMD Versal - 8', progress: 100, status: 'Failed' }
  ];

  // ──────────────────────────────────────────────
  // Event handlers
  // ──────────────────────────────────────────────

  onRowClicked(tableName: string, row: any): void {
    console.log(`[${tableName}] Row clicked:`, row);
  }

  onActionClicked(tableName: string, event: any): void {
    console.log(`[${tableName}] Action clicked:`, event);
  }
}
