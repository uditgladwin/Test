export interface Report {
  requestId: string;
  reportGenerationTime: string;
  reportPeriod: string;
  status: 'in_progress' | 'ready';
}

export interface SidebarItem {
  label: string;
  active: boolean;
}

export type CategoryTab = 'All' | 'Premium' | 'Fleet Safety' | 'Fleet Management';

export type ReportTab = 'one_time' | 'subscription';
