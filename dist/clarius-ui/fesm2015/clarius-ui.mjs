import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule, Injectable } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as i1$1 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

var ButtonState;
(function (ButtonState) {
    ButtonState["Default"] = "default";
    ButtonState["Hover"] = "hover";
    ButtonState["Pressed"] = "pressed";
    ButtonState["Disabled"] = "disabled";
    ButtonState["Loading"] = "loading";
})(ButtonState || (ButtonState = {}));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["Small"] = "small";
    ButtonSize["Large"] = "large";
})(ButtonSize || (ButtonSize = {}));
var ButtonIconMode;
(function (ButtonIconMode) {
    ButtonIconMode["WithIcon"] = "with-icon";
    ButtonIconMode["WithoutIcon"] = "without-icon";
})(ButtonIconMode || (ButtonIconMode = {}));

class ClariusButtonComponent {
    constructor() {
        this.label = '';
        this.size = ButtonSize.Large;
        this.iconMode = ButtonIconMode.WithoutIcon;
        this.state = ButtonState.Default;
        this.icon = '';
        this.type = 'button';
        this.primary = false;
        this.buttonClick = new EventEmitter();
        this.ButtonState = ButtonState;
        this.ButtonSize = ButtonSize;
        this.ButtonIconMode = ButtonIconMode;
    }
    get isDisabled() {
        return this.state === ButtonState.Disabled || this.state === ButtonState.Loading;
    }
    get isLoading() {
        return this.state === ButtonState.Loading;
    }
    get hasIcon() {
        return this.iconMode === ButtonIconMode.WithIcon && !!this.icon;
    }
    get buttonClasses() {
        const classes = ['btn'];
        classes.push('btn--' + this.size);
        if (this.primary) {
            classes.push('btn--primary');
        }
        if (this.isLoading) {
            classes.push('btn--loading');
        }
        if (this.state === ButtonState.Disabled) {
            classes.push('btn--disabled');
        }
        if (this.hasIcon) {
            classes.push('btn--with-icon');
        }
        return classes.join(' ');
    }
    onClick() {
        if (!this.isDisabled) {
            this.buttonClick.emit();
        }
    }
}
ClariusButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ClariusButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ClariusButtonComponent, selector: "clarius-button", inputs: { label: "label", size: "size", iconMode: "iconMode", state: "state", icon: "icon", type: "type", primary: "primary" }, outputs: { buttonClick: "buttonClick" }, ngImport: i0, template: "<button\n  [type]=\"type\"\n  [class]=\"buttonClasses\"\n  [disabled]=\"isDisabled\"\n  (click)=\"onClick()\">\n\n  <span *ngIf=\"hasIcon && !isLoading\" class=\"btn__icon material-icons\">{{ icon }}</span>\n\n  <ng-container *ngIf=\"isLoading\">\n    <img class=\"btn__loading-icon\" src=\"autorenew.png\" alt=\"Loading\" />\n    <span class=\"btn__label\">Loading</span>\n  </ng-container>\n\n  <span *ngIf=\"!isLoading\" class=\"btn__label\">{{ label }}</span>\n</button>\n", styles: [":host{--btn-bg: transparent;--btn-border: #007B94;--btn-text: #FFFFFF;--btn-hover-border: #FFFFFF;--btn-hover-shadow: 0px 4px 4px rgba(0, 0, 0, .25);--btn-pressed-bg: #FFFFFF;--btn-pressed-text: #161616;--btn-disabled-bg: #303030;--btn-disabled-text: #F0F0F0;--btn-large-width: 118px;--btn-large-height: 40px;--btn-large-padding: 0px;--btn-large-font-size: 16px;--btn-large-border-radius: 20px;--btn-small-width: 100px;--btn-small-height: 24px;--btn-small-padding: 0px 12px;--btn-small-font-size: 12px;--btn-small-border-radius: 20px;display:inline-block}.btn{box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;gap:10px;font-family:Noto Sans,sans-serif;font-weight:400;line-height:22px;text-align:center;border:1px solid var(--btn-border);cursor:pointer;transition:all .2s ease;outline:none;background:var(--btn-bg);color:var(--btn-text)}.btn--large{width:var(--btn-large-width);height:var(--btn-large-height);padding:var(--btn-large-padding);font-size:var(--btn-large-font-size);border-radius:var(--btn-large-border-radius)}.btn--small{width:var(--btn-small-width);height:var(--btn-small-height);padding:var(--btn-small-padding);font-size:var(--btn-small-font-size);line-height:16px;border-radius:var(--btn-small-border-radius);gap:6px;border:none;white-space:nowrap}.btn--small.btn--with-icon{width:auto;min-width:100px}.btn--primary{background:#004C5C;border-color:#33baea}.btn--primary:hover:not(.btn--disabled):not(.btn--loading){border-color:#33baea;box-shadow:0 4px 4px #00000040}.btn:hover:not(.btn--disabled):not(.btn--loading),.btn:focus:not(.btn--disabled):not(.btn--loading){border-color:var(--btn-hover-border);box-shadow:var(--btn-hover-shadow)}.btn:active:not(.btn--disabled):not(.btn--loading){background:var(--btn-pressed-bg);color:var(--btn-pressed-text);border-color:var(--btn-pressed-bg);box-shadow:none}.btn--disabled,.btn:disabled{background:var(--btn-disabled-bg);border-color:var(--btn-disabled-bg);color:var(--btn-disabled-text);opacity:.5;cursor:not-allowed;pointer-events:none}.btn--loading{cursor:wait;pointer-events:none}.btn--small.btn--loading,.btn--small.btn--loading:disabled{background:#FFFFFF!important;color:#161616!important;border-color:#fff!important;opacity:1!important}.btn__label{flex:1;display:flex;align-items:center;justify-content:center}.btn__icon{width:20px;height:20px;font-size:20px;display:flex;align-items:center;justify-content:center}.btn--small .btn__icon{width:14px;height:14px;font-size:14px}.btn__loading-icon{width:20px;height:20px;animation:spin 1s linear infinite}.btn--small .btn__loading-icon{width:14px;height:14px}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.btn--with-icon{justify-content:flex-start}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarius-button', template: "<button\n  [type]=\"type\"\n  [class]=\"buttonClasses\"\n  [disabled]=\"isDisabled\"\n  (click)=\"onClick()\">\n\n  <span *ngIf=\"hasIcon && !isLoading\" class=\"btn__icon material-icons\">{{ icon }}</span>\n\n  <ng-container *ngIf=\"isLoading\">\n    <img class=\"btn__loading-icon\" src=\"autorenew.png\" alt=\"Loading\" />\n    <span class=\"btn__label\">Loading</span>\n  </ng-container>\n\n  <span *ngIf=\"!isLoading\" class=\"btn__label\">{{ label }}</span>\n</button>\n", styles: [":host{--btn-bg: transparent;--btn-border: #007B94;--btn-text: #FFFFFF;--btn-hover-border: #FFFFFF;--btn-hover-shadow: 0px 4px 4px rgba(0, 0, 0, .25);--btn-pressed-bg: #FFFFFF;--btn-pressed-text: #161616;--btn-disabled-bg: #303030;--btn-disabled-text: #F0F0F0;--btn-large-width: 118px;--btn-large-height: 40px;--btn-large-padding: 0px;--btn-large-font-size: 16px;--btn-large-border-radius: 20px;--btn-small-width: 100px;--btn-small-height: 24px;--btn-small-padding: 0px 12px;--btn-small-font-size: 12px;--btn-small-border-radius: 20px;display:inline-block}.btn{box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;gap:10px;font-family:Noto Sans,sans-serif;font-weight:400;line-height:22px;text-align:center;border:1px solid var(--btn-border);cursor:pointer;transition:all .2s ease;outline:none;background:var(--btn-bg);color:var(--btn-text)}.btn--large{width:var(--btn-large-width);height:var(--btn-large-height);padding:var(--btn-large-padding);font-size:var(--btn-large-font-size);border-radius:var(--btn-large-border-radius)}.btn--small{width:var(--btn-small-width);height:var(--btn-small-height);padding:var(--btn-small-padding);font-size:var(--btn-small-font-size);line-height:16px;border-radius:var(--btn-small-border-radius);gap:6px;border:none;white-space:nowrap}.btn--small.btn--with-icon{width:auto;min-width:100px}.btn--primary{background:#004C5C;border-color:#33baea}.btn--primary:hover:not(.btn--disabled):not(.btn--loading){border-color:#33baea;box-shadow:0 4px 4px #00000040}.btn:hover:not(.btn--disabled):not(.btn--loading),.btn:focus:not(.btn--disabled):not(.btn--loading){border-color:var(--btn-hover-border);box-shadow:var(--btn-hover-shadow)}.btn:active:not(.btn--disabled):not(.btn--loading){background:var(--btn-pressed-bg);color:var(--btn-pressed-text);border-color:var(--btn-pressed-bg);box-shadow:none}.btn--disabled,.btn:disabled{background:var(--btn-disabled-bg);border-color:var(--btn-disabled-bg);color:var(--btn-disabled-text);opacity:.5;cursor:not-allowed;pointer-events:none}.btn--loading{cursor:wait;pointer-events:none}.btn--small.btn--loading,.btn--small.btn--loading:disabled{background:#FFFFFF!important;color:#161616!important;border-color:#fff!important;opacity:1!important}.btn__label{flex:1;display:flex;align-items:center;justify-content:center}.btn__icon{width:20px;height:20px;font-size:20px;display:flex;align-items:center;justify-content:center}.btn--small .btn__icon{width:14px;height:14px;font-size:14px}.btn__loading-icon{width:20px;height:20px;animation:spin 1s linear infinite}.btn--small .btn__loading-icon{width:14px;height:14px}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.btn--with-icon{justify-content:flex-start}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], size: [{
                type: Input
            }], iconMode: [{
                type: Input
            }], state: [{
                type: Input
            }], icon: [{
                type: Input
            }], type: [{
                type: Input
            }], primary: [{
                type: Input
            }], buttonClick: [{
                type: Output
            }] } });

class ClariusTableComponent {
    constructor() {
        this.columns = [];
        this.rows = [];
        this.actions = [];
        this.statusColors = {};
        this.showLabels = false;
        this.gradient = false;
        this.statusDots = false;
        this.lightWeight = false;
        this.borderGradient = false;
        // Card mode inputs
        this.mode = 'table';
        this.title = '';
        this.headerLink = false;
        this.headerBackground = '';
        this.emptyMessage = '';
        this.showColumnHeaders = false;
        this.rowClicked = new EventEmitter();
        this.actionClicked = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        this.headerClicked = new EventEmitter();
        this.linkClicked = new EventEmitter();
        this.selectedRows = new Set();
    }
    getStatusColor(value) {
        return this.statusColors[value] || '#FFFFFF';
    }
    getStatusBackground(value) {
        const rgb = this.hexToRgb(this.statusColors[value]);
        return rgb ? 'rgba(' + rgb + ',0.1)' : 'transparent';
    }
    getStatusBorder(value) {
        const rgb = this.hexToRgb(this.statusColors[value]);
        return rgb ? '1px solid rgba(' + rgb + ',0.2)' : 'transparent';
    }
    hexToRgb(hex) {
        if (!hex)
            return null;
        return parseInt(hex.slice(1, 3), 16) + ',' + parseInt(hex.slice(3, 5), 16) + ',' + parseInt(hex.slice(5, 7), 16);
    }
    getButtonSize(action) {
        return action.size === 'small' ? ButtonSize.Small : ButtonSize.Large;
    }
    isActionPrimary(action, row) {
        if (action.primaryField && action.primaryValue) {
            return row[action.primaryField] === action.primaryValue;
        }
        return !!action.primary;
    }
    isActionDisabled(action, row) {
        if (action.disabledField) {
            return row[action.disabledField] === action.disabledValue;
        }
        return false;
    }
    getActionState(action, row) {
        return this.isActionDisabled(action, row) ? ButtonState.Disabled : ButtonState.Default;
    }
    onActionClick(actionId, row, event) {
        event.stopPropagation();
        this.actionClicked.emit({ action: actionId, row: row });
    }
    onActionButtonClick(actionId, row) {
        this.actionClicked.emit({ action: actionId, row: row });
    }
    onLinkClick(column, row, event) {
        event.stopPropagation();
        this.linkClicked.emit({ column: column, row: row });
    }
    isSelected(row) {
        return this.selectedRows.has(row);
    }
    get allSelected() {
        return this.rows.length > 0 && this.selectedRows.size === this.rows.length;
    }
    get someSelected() {
        return this.selectedRows.size > 0 && this.selectedRows.size < this.rows.length;
    }
    toggleRow(row, event) {
        event.stopPropagation();
        if (this.selectedRows.has(row)) {
            this.selectedRows.delete(row);
        }
        else {
            this.selectedRows.add(row);
        }
        this.selectionChanged.emit(Array.from(this.selectedRows));
    }
    toggleAll(event) {
        event.stopPropagation();
        if (this.allSelected) {
            this.selectedRows.clear();
        }
        else {
            this.rows.forEach(r => this.selectedRows.add(r));
        }
        this.selectionChanged.emit(Array.from(this.selectedRows));
    }
}
ClariusTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ClariusTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ClariusTableComponent, selector: "clarius-table", inputs: { columns: "columns", rows: "rows", actions: "actions", statusColors: "statusColors", showLabels: "showLabels", gradient: "gradient", statusDots: "statusDots", lightWeight: "lightWeight", borderGradient: "borderGradient", mode: "mode", title: "title", headerLink: "headerLink", headerBackground: "headerBackground", emptyMessage: "emptyMessage", showColumnHeaders: "showColumnHeaders" }, outputs: { rowClicked: "rowClicked", actionClicked: "actionClicked", selectionChanged: "selectionChanged", headerClicked: "headerClicked", linkClicked: "linkClicked" }, ngImport: i0, template: "<!-- CARD MODE -->\n<div class=\"card\" *ngIf=\"mode === 'card'\">\n\n  <div class=\"card-header\" *ngIf=\"title\" [style.background]=\"headerBackground || ''\">\n    <span class=\"card-title\">{{ title }}</span>\n    <span *ngIf=\"headerLink\" class=\"card-arrow\" (click)=\"headerClicked.emit()\">&#8594;</span>\n  </div>\n\n  <div class=\"card-columns\" *ngIf=\"showColumnHeaders && rows.length > 0\">\n    <span class=\"card-col-header\" *ngFor=\"let col of columns\">{{ col.label }}</span>\n  </div>\n\n  <div class=\"card-empty\" *ngIf=\"emptyMessage && rows.length === 0\">\n    {{ emptyMessage }}\n  </div>\n\n  <div class=\"card-row\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <ng-container *ngFor=\"let col of columns\">\n\n      <span *ngIf=\"!col.type || col.type === 'text'\" class=\"card-cell\" [style.color]=\"col.textColor || ''\">\n        {{ row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'dot'\" class=\"card-cell\">\n        <span class=\"dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n      </span>\n\n      <span *ngIf=\"col.type === 'link'\" class=\"card-cell link-text\" (click)=\"onLinkClick(col.key, row, $event)\">\n        {{ col.linkText || row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'progress'\" class=\"card-cell\">\n        <span class=\"progress-circle\" [style.border-color]=\"getStatusColor(row[col.key + 'Status'] || 'default')\">\n          {{ row[col.key] }}\n        </span>\n      </span>\n\n    </ng-container>\n  </div>\n\n</div>\n\n<!-- TABLE MODE -->\n<div class=\"table\" *ngIf=\"mode === 'table'\" [class.gradient]=\"gradient\" [class.border-gradient]=\"borderGradient\" [class.light-weight]=\"lightWeight\">\n\n  <div class=\"header\" *ngIf=\"!showLabels\">\n    <div class=\"header-cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n      <input *ngIf=\"col.type === 'checkbox'\" type=\"checkbox\" [checked]=\"allSelected\" [indeterminate]=\"someSelected\" (click)=\"toggleAll($event)\" />\n      <span *ngIf=\"col.type !== 'checkbox'\">{{ col.label }}</span>\n    </div>\n  </div>\n\n  <div class=\"row\" [class.row--dimmed]=\"row._dimmed\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <div class=\"cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n\n      <ng-container *ngIf=\"col.type === 'checkbox'\">\n        <input type=\"checkbox\" [checked]=\"isSelected(row)\" (click)=\"toggleRow(row, $event)\" />\n      </ng-container>\n\n      <ng-container *ngIf=\"!col.type || col.type === 'text'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span [style.color]=\"col.textColor || ''\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span *ngIf=\"!statusDots\" class=\"badge\"\n          [style.color]=\"getStatusColor(row[col.key])\"\n          [style.background]=\"getStatusBackground(row[col.key])\"\n          [style.border]=\"getStatusBorder(row[col.key])\">\n          {{ row[col.key] }}\n        </span>\n        <span *ngIf=\"statusDots\" class=\"status-dot-wrapper\">\n          <span class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-text'\">\n        <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-dot'\">\n        <span class=\"status-dot-wrapper\">\n          <span *ngIf=\"statusColors[row[col.key]]\" class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"statusColors[row[col.key]] ? getStatusColor(row[col.key]) : '#FFFFFF'\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <span *ngIf=\"col.type === 'actions'\" class=\"actions\">\n        <ng-container *ngFor=\"let a of actions\">\n          <img *ngIf=\"a.icon && a.icon.includes('/')\" class=\"icon-btn\" [src]=\"a.icon\" (click)=\"onActionClick(a.id, row, $event)\" />\n          <span *ngIf=\"a.icon && !a.icon.includes('/')\" class=\"icon-btn\" (click)=\"onActionClick(a.id, row, $event)\">{{ a.icon }}</span>\n          <clarius-button *ngIf=\"!a.icon\"\n            [label]=\"a.label\"\n            [size]=\"getButtonSize(a)\"\n            [primary]=\"isActionPrimary(a, row)\"\n            [state]=\"getActionState(a, row)\"\n            (buttonClick)=\"onActionButtonClick(a.id, row)\">\n          </clarius-button>\n        </ng-container>\n      </span>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".table{border:1px solid #303030;border-radius:10px;background:#161616;font-family:Noto Sans,sans-serif}.header{display:flex;padding:16px 24px;border-bottom:1px solid #303030}.header-cell{flex:1;font-size:12px;font-weight:400;color:#b1b1b1}.row{display:flex;align-items:center;padding:0 24px;height:42px;border-bottom:1px solid #303030;cursor:pointer}.row:last-child{border-bottom:none}.row:hover{background:#1e1e1e}.cell{flex:1;font-size:12px;font-weight:700;line-height:16px;color:#fff;padding:13px 0;height:42px;box-sizing:border-box;display:flex;align-items:center}.table.light-weight .cell{font-weight:400}.badge{display:inline-block;text-align:center;width:168px;height:24px;line-height:24px;border-radius:12px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}.col-actions{flex:1;display:flex;justify-content:flex-end}.col-checkbox{flex:0 0 40px}.actions{display:flex;gap:12px;align-items:center}.actions clarius-button{display:inline-block}.icon-btn{width:24px;height:24px;font-size:18px;cursor:pointer;padding:4px}.icon-btn img{width:100%;height:100%;object-fit:contain;filter:brightness(0) invert(1)}.icon-btn:hover{opacity:.7}.status-dot-wrapper{display:flex;align-items:center;gap:6px}.status-dot{width:8px;height:8px;border-radius:50%}.table.gradient{background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%);padding:24px}.table.gradient .header{padding:0 0 24px;border-bottom:none}.table.gradient .header-cell{font-size:16px;font-weight:400;color:#6b6b6b}.table.gradient .row{height:auto;padding:11px 0}.table.gradient .cell{font-size:16px;font-weight:500;line-height:22px;height:auto;padding:0}.table.gradient .icon-btn{font-size:20px;opacity:.6}.table.gradient .actions{gap:16px}.cell-label{font-size:12px;font-weight:400;color:#b1b1b1;line-height:16px}input[type=checkbox]{width:16px;height:16px;cursor:pointer;accent-color:#33BAEA}.row--dimmed .cell{color:#6b6b6b}.table.border-gradient{border:1px solid transparent;border-image-source:linear-gradient(180deg,rgba(56,56,56,0) 0%,#222222 100%);border-image-slice:1}.card{border:1px solid #303030;border-radius:10px;background:#161616;font-family:Noto Sans,sans-serif;overflow:hidden}.card-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #303030}.card-title{font-size:16px;font-weight:700;color:#fff}.card-arrow{font-size:18px;color:#b1b1b1;cursor:pointer}.card-arrow:hover{color:#fff}.card-columns{display:flex;padding:12px 20px;border-bottom:1px solid #303030}.card-col-header{flex:1;font-size:12px;font-weight:400;color:#b1b1b1}.card-empty{padding:40px 20px;text-align:center;font-size:13px;color:#b1b1b1}.card-row{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid #303030;cursor:pointer}.card-row:last-child{border-bottom:none}.card-row:hover{background:#1e1e1e}.card-cell{flex:1;font-size:12px;font-weight:700;color:#fff}.dot{width:8px;height:8px;border-radius:50%;display:inline-block}.link-text{color:#33baea;cursor:pointer;font-weight:700;text-align:right}.link-text:hover{text-decoration:underline}.progress-circle{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:3px solid #FF3B30;font-size:9px;font-weight:700;color:#fff}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ClariusButtonComponent, selector: "clarius-button", inputs: ["label", "size", "iconMode", "state", "icon", "type", "primary"], outputs: ["buttonClick"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarius-table', template: "<!-- CARD MODE -->\n<div class=\"card\" *ngIf=\"mode === 'card'\">\n\n  <div class=\"card-header\" *ngIf=\"title\" [style.background]=\"headerBackground || ''\">\n    <span class=\"card-title\">{{ title }}</span>\n    <span *ngIf=\"headerLink\" class=\"card-arrow\" (click)=\"headerClicked.emit()\">&#8594;</span>\n  </div>\n\n  <div class=\"card-columns\" *ngIf=\"showColumnHeaders && rows.length > 0\">\n    <span class=\"card-col-header\" *ngFor=\"let col of columns\">{{ col.label }}</span>\n  </div>\n\n  <div class=\"card-empty\" *ngIf=\"emptyMessage && rows.length === 0\">\n    {{ emptyMessage }}\n  </div>\n\n  <div class=\"card-row\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <ng-container *ngFor=\"let col of columns\">\n\n      <span *ngIf=\"!col.type || col.type === 'text'\" class=\"card-cell\" [style.color]=\"col.textColor || ''\">\n        {{ row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'dot'\" class=\"card-cell\">\n        <span class=\"dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n      </span>\n\n      <span *ngIf=\"col.type === 'link'\" class=\"card-cell link-text\" (click)=\"onLinkClick(col.key, row, $event)\">\n        {{ col.linkText || row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'progress'\" class=\"card-cell\">\n        <span class=\"progress-circle\" [style.border-color]=\"getStatusColor(row[col.key + 'Status'] || 'default')\">\n          {{ row[col.key] }}\n        </span>\n      </span>\n\n    </ng-container>\n  </div>\n\n</div>\n\n<!-- TABLE MODE -->\n<div class=\"table\" *ngIf=\"mode === 'table'\" [class.gradient]=\"gradient\" [class.border-gradient]=\"borderGradient\" [class.light-weight]=\"lightWeight\">\n\n  <div class=\"header\" *ngIf=\"!showLabels\">\n    <div class=\"header-cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n      <input *ngIf=\"col.type === 'checkbox'\" type=\"checkbox\" [checked]=\"allSelected\" [indeterminate]=\"someSelected\" (click)=\"toggleAll($event)\" />\n      <span *ngIf=\"col.type !== 'checkbox'\">{{ col.label }}</span>\n    </div>\n  </div>\n\n  <div class=\"row\" [class.row--dimmed]=\"row._dimmed\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <div class=\"cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n\n      <ng-container *ngIf=\"col.type === 'checkbox'\">\n        <input type=\"checkbox\" [checked]=\"isSelected(row)\" (click)=\"toggleRow(row, $event)\" />\n      </ng-container>\n\n      <ng-container *ngIf=\"!col.type || col.type === 'text'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span [style.color]=\"col.textColor || ''\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span *ngIf=\"!statusDots\" class=\"badge\"\n          [style.color]=\"getStatusColor(row[col.key])\"\n          [style.background]=\"getStatusBackground(row[col.key])\"\n          [style.border]=\"getStatusBorder(row[col.key])\">\n          {{ row[col.key] }}\n        </span>\n        <span *ngIf=\"statusDots\" class=\"status-dot-wrapper\">\n          <span class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-text'\">\n        <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-dot'\">\n        <span class=\"status-dot-wrapper\">\n          <span *ngIf=\"statusColors[row[col.key]]\" class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"statusColors[row[col.key]] ? getStatusColor(row[col.key]) : '#FFFFFF'\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <span *ngIf=\"col.type === 'actions'\" class=\"actions\">\n        <ng-container *ngFor=\"let a of actions\">\n          <img *ngIf=\"a.icon && a.icon.includes('/')\" class=\"icon-btn\" [src]=\"a.icon\" (click)=\"onActionClick(a.id, row, $event)\" />\n          <span *ngIf=\"a.icon && !a.icon.includes('/')\" class=\"icon-btn\" (click)=\"onActionClick(a.id, row, $event)\">{{ a.icon }}</span>\n          <clarius-button *ngIf=\"!a.icon\"\n            [label]=\"a.label\"\n            [size]=\"getButtonSize(a)\"\n            [primary]=\"isActionPrimary(a, row)\"\n            [state]=\"getActionState(a, row)\"\n            (buttonClick)=\"onActionButtonClick(a.id, row)\">\n          </clarius-button>\n        </ng-container>\n      </span>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".table{border:1px solid #303030;border-radius:10px;background:#161616;font-family:Noto Sans,sans-serif}.header{display:flex;padding:16px 24px;border-bottom:1px solid #303030}.header-cell{flex:1;font-size:12px;font-weight:400;color:#b1b1b1}.row{display:flex;align-items:center;padding:0 24px;height:42px;border-bottom:1px solid #303030;cursor:pointer}.row:last-child{border-bottom:none}.row:hover{background:#1e1e1e}.cell{flex:1;font-size:12px;font-weight:700;line-height:16px;color:#fff;padding:13px 0;height:42px;box-sizing:border-box;display:flex;align-items:center}.table.light-weight .cell{font-weight:400}.badge{display:inline-block;text-align:center;width:168px;height:24px;line-height:24px;border-radius:12px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}.col-actions{flex:1;display:flex;justify-content:flex-end}.col-checkbox{flex:0 0 40px}.actions{display:flex;gap:12px;align-items:center}.actions clarius-button{display:inline-block}.icon-btn{width:24px;height:24px;font-size:18px;cursor:pointer;padding:4px}.icon-btn img{width:100%;height:100%;object-fit:contain;filter:brightness(0) invert(1)}.icon-btn:hover{opacity:.7}.status-dot-wrapper{display:flex;align-items:center;gap:6px}.status-dot{width:8px;height:8px;border-radius:50%}.table.gradient{background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%);padding:24px}.table.gradient .header{padding:0 0 24px;border-bottom:none}.table.gradient .header-cell{font-size:16px;font-weight:400;color:#6b6b6b}.table.gradient .row{height:auto;padding:11px 0}.table.gradient .cell{font-size:16px;font-weight:500;line-height:22px;height:auto;padding:0}.table.gradient .icon-btn{font-size:20px;opacity:.6}.table.gradient .actions{gap:16px}.cell-label{font-size:12px;font-weight:400;color:#b1b1b1;line-height:16px}input[type=checkbox]{width:16px;height:16px;cursor:pointer;accent-color:#33BAEA}.row--dimmed .cell{color:#6b6b6b}.table.border-gradient{border:1px solid transparent;border-image-source:linear-gradient(180deg,rgba(56,56,56,0) 0%,#222222 100%);border-image-slice:1}.card{border:1px solid #303030;border-radius:10px;background:#161616;font-family:Noto Sans,sans-serif;overflow:hidden}.card-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #303030}.card-title{font-size:16px;font-weight:700;color:#fff}.card-arrow{font-size:18px;color:#b1b1b1;cursor:pointer}.card-arrow:hover{color:#fff}.card-columns{display:flex;padding:12px 20px;border-bottom:1px solid #303030}.card-col-header{flex:1;font-size:12px;font-weight:400;color:#b1b1b1}.card-empty{padding:40px 20px;text-align:center;font-size:13px;color:#b1b1b1}.card-row{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid #303030;cursor:pointer}.card-row:last-child{border-bottom:none}.card-row:hover{background:#1e1e1e}.card-cell{flex:1;font-size:12px;font-weight:700;color:#fff}.dot{width:8px;height:8px;border-radius:50%;display:inline-block}.link-text{color:#33baea;cursor:pointer;font-weight:700;text-align:right}.link-text:hover{text-decoration:underline}.progress-circle{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:3px solid #FF3B30;font-size:9px;font-weight:700;color:#fff}\n"] }]
        }], propDecorators: { columns: [{
                type: Input
            }], rows: [{
                type: Input
            }], actions: [{
                type: Input
            }], statusColors: [{
                type: Input
            }], showLabels: [{
                type: Input
            }], gradient: [{
                type: Input
            }], statusDots: [{
                type: Input
            }], lightWeight: [{
                type: Input
            }], borderGradient: [{
                type: Input
            }], mode: [{
                type: Input
            }], title: [{
                type: Input
            }], headerLink: [{
                type: Input
            }], headerBackground: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], showColumnHeaders: [{
                type: Input
            }], rowClicked: [{
                type: Output
            }], actionClicked: [{
                type: Output
            }], selectionChanged: [{
                type: Output
            }], headerClicked: [{
                type: Output
            }], linkClicked: [{
                type: Output
            }] } });

class ButtonModule {
}
ButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: ButtonModule, declarations: [ClariusButtonComponent], imports: [CommonModule], exports: [ClariusButtonComponent] });
ButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ButtonModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ClariusButtonComponent],
                    imports: [CommonModule],
                    exports: [ClariusButtonComponent],
                }]
        }] });

class TableModule {
}
TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: TableModule, declarations: [ClariusTableComponent], imports: [CommonModule, ButtonModule], exports: [ClariusTableComponent] });
TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableModule, imports: [CommonModule, ButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ClariusTableComponent],
                    imports: [CommonModule, ButtonModule],
                    exports: [ClariusTableComponent],
                }]
        }] });

class ClariusDashboardComponent {
    constructor() {
        this.greeting = '';
        this.actionLabel = '';
        this.actionIcon = '';
        this.actionClicked = new EventEmitter();
    }
}
ClariusDashboardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDashboardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ClariusDashboardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ClariusDashboardComponent, selector: "clarius-dashboard", inputs: { greeting: "greeting", actionLabel: "actionLabel", actionIcon: "actionIcon" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: "<div class=\"dashboard\">\n\n  <div class=\"dashboard-header\">\n    <span class=\"greeting\">{{ greeting }}</span>\n    <clarius-button *ngIf=\"actionLabel\"\n      [label]=\"actionLabel\"\n      [icon]=\"actionIcon\"\n      (buttonClick)=\"actionClicked.emit()\">\n    </clarius-button>\n  </div>\n\n  <div class=\"widget-grid\">\n    <ng-content></ng-content>\n  </div>\n\n</div>\n", styles: [".dashboard{padding:2.5rem;font-family:Noto Sans,sans-serif}.dashboard-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}.greeting{font-weight:600;font-size:24px;line-height:29px;color:#fff}.widget-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ClariusButtonComponent, selector: "clarius-button", inputs: ["label", "size", "iconMode", "state", "icon", "type", "primary"], outputs: ["buttonClick"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDashboardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarius-dashboard', template: "<div class=\"dashboard\">\n\n  <div class=\"dashboard-header\">\n    <span class=\"greeting\">{{ greeting }}</span>\n    <clarius-button *ngIf=\"actionLabel\"\n      [label]=\"actionLabel\"\n      [icon]=\"actionIcon\"\n      (buttonClick)=\"actionClicked.emit()\">\n    </clarius-button>\n  </div>\n\n  <div class=\"widget-grid\">\n    <ng-content></ng-content>\n  </div>\n\n</div>\n", styles: [".dashboard{padding:2.5rem;font-family:Noto Sans,sans-serif}.dashboard-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}.greeting{font-weight:600;font-size:24px;line-height:29px;color:#fff}.widget-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:1rem}\n"] }]
        }], propDecorators: { greeting: [{
                type: Input
            }], actionLabel: [{
                type: Input
            }], actionIcon: [{
                type: Input
            }], actionClicked: [{
                type: Output
            }] } });

class DashboardModule {
}
DashboardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DashboardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DashboardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: DashboardModule, declarations: [ClariusDashboardComponent], imports: [CommonModule, ButtonModule], exports: [ClariusDashboardComponent] });
DashboardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DashboardModule, imports: [CommonModule, ButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DashboardModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ClariusDashboardComponent],
                    imports: [CommonModule, ButtonModule],
                    exports: [ClariusDashboardComponent],
                }]
        }] });

class ClariusDataService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Fetch table/card data from an API endpoint.
     * The response JSON should have keys for columns, rows, actions, statusColors.
     * You can customize which keys to read via the config.
     */
    fetch(config) {
        return this.http.get(config.url).pipe(map(data => ({
            columns: data[config.columnsKey || 'columns'] || [],
            rows: data[config.rowsKey || 'rows'] || [],
            actions: data[config.actionsKey || 'actions'] || [],
            statusColors: data[config.statusColorsKey || 'statusColors'] || {},
        })), catchError(err => {
            console.error('ClariusDataService fetch error:', err);
            return of({ columns: [], rows: [], actions: [], statusColors: {} });
        }));
    }
    /**
     * Fetch just rows from an API (columns/actions defined in code, rows from API).
     */
    fetchRows(url) {
        return this.http.get(url).pipe(catchError(err => {
            console.error('ClariusDataService fetchRows error:', err);
            return of([]);
        }));
    }
}
ClariusDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataService, deps: [{ token: i1$1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
ClariusDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }]; } });

class ClariusDataModule {
}
ClariusDataModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ClariusDataModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataModule, imports: [HttpClientModule], exports: [HttpClientModule] });
ClariusDataModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataModule, imports: [HttpClientModule, HttpClientModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [HttpClientModule],
                    exports: [HttpClientModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonIconMode, ButtonModule, ButtonSize, ButtonState, ClariusButtonComponent, ClariusDashboardComponent, ClariusDataModule, ClariusDataService, ClariusTableComponent, DashboardModule, TableModule };
//# sourceMappingURL=clarius-ui.mjs.map
