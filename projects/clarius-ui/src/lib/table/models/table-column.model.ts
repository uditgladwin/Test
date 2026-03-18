export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'status' | 'status-text' | 'status-dot' | 'actions' | 'checkbox';
  textColor?: string;
}

export interface TableAction {
  id: string;
  label: string;
  icon?: string;
  primary?: boolean;
  size?: 'small' | 'large';
}
