export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'status' | 'actions';
}

export interface TableAction {
  id: string;
  label: string;
  icon?: string;
  primary?: boolean;
}
