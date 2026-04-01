export interface CardColumn {
  key: string;
  label?: string;
  type?: 'text' | 'link' | 'dot' | 'progress';
  linkText?: string;
  textColor?: string;
}
