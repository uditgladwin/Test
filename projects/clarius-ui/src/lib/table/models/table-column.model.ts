import { TableAction } from './table-action.model';

export interface TableColumn {
  key: string;
  label: string;
  type?:
    | 'text'
    | 'status'
    | 'icon'
    | 'avatar'
    | 'actions'
    | 'progress';
  width?: string;
  sortable?: boolean;
  icon?: (row: any) => string;
  color?: (row: any) => string;
  actions?: TableAction[];
}
