export interface TableColumn {
  key: string;
  label?: string;
  type?: 'text' | 'status' | 'status-text' | 'status-dot' | 'actions' | 'checkbox' | 'dot' | 'link' | 'progress';
  textColor?: string;
  linkText?: string;
}

export interface TableAction {
  id: string;
  label: string;
  icon?: string;
  primary?: boolean;
  primaryField?: string;
  primaryValue?: string;
  disabledField?: string;
  disabledValue?: any;
  size?: 'small' | 'large';
}
