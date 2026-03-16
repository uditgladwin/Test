export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'status' | 'actions' | 'checkbox';
  textColor?: string;
}

export interface TableAction {
  id: string;
  label: string;
  icon?: string;
  primary?: boolean;
  size?: 'small' | 'large';
}
