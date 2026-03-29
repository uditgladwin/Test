import { EventEmitter } from '@angular/core';
import { TableColumn, TableAction } from '../models/table-column.model';
import { ButtonSize, ButtonState } from '../../button/button.enums';
import * as i0 from "@angular/core";
export declare class ClariusTableComponent {
    columns: TableColumn[];
    rows: any[];
    actions: TableAction[];
    statusColors: {
        [value: string]: string;
    };
    showLabels: boolean;
    gradient: boolean;
    statusDots: boolean;
    lightWeight: boolean;
    borderGradient: boolean;
    mode: 'table' | 'card';
    title: string;
    headerLink: boolean;
    headerBackground: string;
    emptyMessage: string;
    showColumnHeaders: boolean;
    rowClicked: EventEmitter<any>;
    actionClicked: EventEmitter<{
        action: string;
        row: any;
    }>;
    selectionChanged: EventEmitter<any[]>;
    headerClicked: EventEmitter<void>;
    linkClicked: EventEmitter<{
        column: string;
        row: any;
    }>;
    selectedRows: Set<any>;
    getStatusColor(value: string): string;
    getStatusBackground(value: string): string;
    getStatusBorder(value: string): string;
    private hexToRgb;
    getButtonSize(action: TableAction): ButtonSize;
    isActionPrimary(action: TableAction, row: any): boolean;
    isActionDisabled(action: TableAction, row: any): boolean;
    getActionState(action: TableAction, row: any): ButtonState;
    onActionClick(actionId: string, row: any, event: MouseEvent): void;
    onActionButtonClick(actionId: string, row: any): void;
    onLinkClick(column: string, row: any, event: MouseEvent): void;
    isSelected(row: any): boolean;
    get allSelected(): boolean;
    get someSelected(): boolean;
    toggleRow(row: any, event: MouseEvent): void;
    toggleAll(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClariusTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClariusTableComponent, "clarius-table", never, { "columns": "columns"; "rows": "rows"; "actions": "actions"; "statusColors": "statusColors"; "showLabels": "showLabels"; "gradient": "gradient"; "statusDots": "statusDots"; "lightWeight": "lightWeight"; "borderGradient": "borderGradient"; "mode": "mode"; "title": "title"; "headerLink": "headerLink"; "headerBackground": "headerBackground"; "emptyMessage": "emptyMessage"; "showColumnHeaders": "showColumnHeaders"; }, { "rowClicked": "rowClicked"; "actionClicked": "actionClicked"; "selectionChanged": "selectionChanged"; "headerClicked": "headerClicked"; "linkClicked": "linkClicked"; }, never, never, false>;
}
