// column config - tells the table what to show
export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'status' | 'actions';
}

// action button config
export interface TableAction {
  id: string;
  label: string;
}
