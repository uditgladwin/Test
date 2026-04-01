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
        this.largeText = false;
        // Card mode inputs
        this.mode = 'table';
        this.title = '';
        this.headerLink = false;
        this.headerBackground = '';
        this.emptyMessage = '';
        this.showColumnHeaders = false;
        this.cardVariant = '';
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
ClariusTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ClariusTableComponent, selector: "clarius-table", inputs: { columns: "columns", rows: "rows", actions: "actions", statusColors: "statusColors", showLabels: "showLabels", gradient: "gradient", statusDots: "statusDots", lightWeight: "lightWeight", borderGradient: "borderGradient", largeText: "largeText", mode: "mode", title: "title", headerLink: "headerLink", headerBackground: "headerBackground", emptyMessage: "emptyMessage", showColumnHeaders: "showColumnHeaders", cardVariant: "cardVariant" }, outputs: { rowClicked: "rowClicked", actionClicked: "actionClicked", selectionChanged: "selectionChanged", headerClicked: "headerClicked", linkClicked: "linkClicked" }, ngImport: i0, template: "<!-- CARD MODE -->\n<div class=\"card\" *ngIf=\"mode === 'card'\" [class.card--red-header]=\"cardVariant === 'red-header'\">\n\n  <div class=\"card-header\" *ngIf=\"title\" [style.background]=\"headerBackground || ''\">\n    <span class=\"card-title\">{{ title }}</span>\n    <span *ngIf=\"headerLink\" class=\"card-arrow\" (click)=\"headerClicked.emit()\">&#8594;</span>\n  </div>\n\n  <div class=\"card-columns\" *ngIf=\"showColumnHeaders && rows.length > 0\">\n    <span class=\"card-col-header\" *ngFor=\"let col of columns\">{{ col.label }}</span>\n  </div>\n\n  <div class=\"card-empty\" *ngIf=\"emptyMessage && rows.length === 0\">\n    {{ emptyMessage }}\n  </div>\n\n  <div class=\"card-row\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <ng-container *ngFor=\"let col of columns\">\n\n      <span *ngIf=\"!col.type || col.type === 'text'\" class=\"card-cell\" [style.color]=\"col.textColor || ''\">\n        {{ row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'dot'\" class=\"card-cell\">\n        <span class=\"dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n      </span>\n\n      <span *ngIf=\"col.type === 'link'\" class=\"card-cell link-text\" (click)=\"onLinkClick(col.key, row, $event)\">\n        {{ col.linkText || row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'progress'\" class=\"card-cell\">\n        <span class=\"progress-circle\" [style.border-color]=\"getStatusColor(row[col.key + 'Status'] || 'default')\">\n          {{ row[col.key] }}\n        </span>\n      </span>\n\n    </ng-container>\n  </div>\n\n</div>\n\n<!-- TABLE MODE -->\n<div class=\"table\" *ngIf=\"mode === 'table'\" [class.gradient]=\"gradient\" [class.border-gradient]=\"borderGradient\" [class.light-weight]=\"lightWeight\" [class.large-text]=\"largeText\">\n\n  <div class=\"header\" *ngIf=\"!showLabels\">\n    <div class=\"header-cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n      <input *ngIf=\"col.type === 'checkbox'\" type=\"checkbox\" [checked]=\"allSelected\" [indeterminate]=\"someSelected\" (click)=\"toggleAll($event)\" />\n      <span *ngIf=\"col.type !== 'checkbox'\">{{ col.label }}</span>\n    </div>\n  </div>\n\n  <div class=\"row\" [class.row--dimmed]=\"row._dimmed\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <div class=\"cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n\n      <ng-container *ngIf=\"col.type === 'checkbox'\">\n        <input type=\"checkbox\" [checked]=\"isSelected(row)\" (click)=\"toggleRow(row, $event)\" />\n      </ng-container>\n\n      <ng-container *ngIf=\"!col.type || col.type === 'text'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span [style.color]=\"col.textColor || ''\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span *ngIf=\"!statusDots\" class=\"badge\"\n          [style.color]=\"getStatusColor(row[col.key])\"\n          [style.background]=\"getStatusBackground(row[col.key])\"\n          [style.border]=\"getStatusBorder(row[col.key])\">\n          {{ row[col.key] }}\n        </span>\n        <span *ngIf=\"statusDots\" class=\"status-dot-wrapper\">\n          <span class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-text'\">\n        <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-dot'\">\n        <span class=\"status-dot-wrapper\">\n          <span *ngIf=\"statusColors[row[col.key]]\" class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"statusColors[row[col.key]] ? getStatusColor(row[col.key]) : '#FFFFFF'\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <span *ngIf=\"col.type === 'actions'\" class=\"actions\">\n        <ng-container *ngFor=\"let a of actions\">\n          <img *ngIf=\"a.icon && a.icon.includes('/')\" class=\"icon-btn\" [src]=\"a.icon\" (click)=\"onActionClick(a.id, row, $event)\" />\n          <span *ngIf=\"a.icon && !a.icon.includes('/')\" class=\"icon-btn\" (click)=\"onActionClick(a.id, row, $event)\">{{ a.icon }}</span>\n          <clarius-button *ngIf=\"!a.icon\"\n            [label]=\"a.label\"\n            [size]=\"getButtonSize(a)\"\n            [primary]=\"isActionPrimary(a, row)\"\n            [state]=\"getActionState(a, row)\"\n            (buttonClick)=\"onActionButtonClick(a.id, row)\">\n          </clarius-button>\n        </ng-container>\n      </span>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".table{border:1px solid #303030;border-radius:10px;background:#161616;padding:24px;font-family:Noto Sans,sans-serif}.header{display:flex;padding:0 0 24px;border-bottom:1px solid #303030}.header-cell{flex:1;font-size:12px;font-weight:400;color:#6b6b6b;white-space:nowrap;box-sizing:border-box}.row{display:flex;align-items:center;padding:0;min-height:56px;border-bottom:1px solid #303030;cursor:pointer}.row:last-child{border-bottom:none}.row:hover{background:#1e1e1e}.cell{flex:1;font-size:12px;font-weight:700;line-height:16px;color:#fff;padding:13px 0;box-sizing:border-box;display:flex;align-items:center;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.table.light-weight .cell{font-weight:400}.badge{display:inline-block;text-align:center;width:168px;height:24px;line-height:24px;border-radius:12px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}.status-dot-wrapper{display:flex;align-items:center;gap:6px}.status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}.col-actions{flex:1;display:flex;justify-content:flex-end}.col-checkbox{flex:0 0 40px}.actions{display:flex;gap:16px;align-items:center}.actions clarius-button{display:inline-block}.icon-btn{width:24px;height:24px;font-size:18px;cursor:pointer;padding:4px}.icon-btn img{width:100%;height:100%;object-fit:contain;filter:brightness(0) invert(1)}.icon-btn:hover{opacity:.7}.cell-label{font-size:12px;font-weight:400;color:#6b6b6b;line-height:16px}input[type=checkbox]{width:16px;height:16px;cursor:pointer;accent-color:#33BAEA}.row--dimmed .cell{color:#5b5b5b}.table.gradient{background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%)}.table.gradient .row{min-height:64px}.table.large-text .header-cell{font-size:16px}.table.large-text .cell{font-size:16px;font-weight:500}.table.large-text .row{min-height:auto;padding:11px 0}.table.border-gradient{border:1px solid transparent;border-image-source:linear-gradient(180deg,rgba(56,56,56,0) 0%,#222222 100%);border-image-slice:1}.card{border-radius:10px;background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%);font-family:Noto Sans,sans-serif;overflow-y:hidden;height:300px;padding:15px 24px 24px;box-sizing:border-box}.card:hover{overflow-y:auto}.card::-webkit-scrollbar{width:6px}.card::-webkit-scrollbar-track{background:#424242;box-shadow:inset 0 0 6px #6b6b6b4d}.card::-webkit-scrollbar-thumb{background:#B1B1B1;border-radius:20px;outline:1px solid slategrey}.card-header{display:flex;align-items:center;justify-content:space-between;padding:0;margin-bottom:10px}.card-title{font-size:18px;font-weight:400;color:#6b6b6b}.card-arrow{font-size:18px;color:#b1b1b1;cursor:pointer}.card-arrow:hover{color:#fff}.card-columns{display:flex;padding:0 0 18px;margin-top:10px}.card-col-header{flex:1;font-size:10.5px;font-weight:400;line-height:20px;color:#6b6b6b}.card-empty{display:flex;align-items:center;justify-content:center;height:200px;font-size:1rem;font-weight:600;color:#fff;opacity:.6}.card-row{display:flex;align-items:center;padding:11.5px 0;border-bottom:1px solid #4d4c4c;cursor:pointer}.card-row:last-child{border-bottom:none}.card-row:hover{background:rgba(255,255,255,.03)}.card-cell{flex:1;font-size:16px;font-weight:400;line-height:19px;color:#fff;text-overflow:ellipsis;word-break:break-all;overflow:hidden;white-space:nowrap;padding-right:16px}.dot{width:8px;height:8px;border-radius:50%;display:inline-block}.link-text{color:#33baea;cursor:pointer;font-weight:600;font-size:12px;text-align:right;text-transform:uppercase;padding-right:0}.link-text:hover{text-decoration:underline}.progress-circle{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:2px solid #6B6B6B;font-size:10px;font-weight:700;color:#fff}.card.card--red-header{background:linear-gradient(180deg,#850800fa -134.58%,rgb(0 0 0 / 53%) 111.21%);height:318px}.card.card--red-header .progress-circle{border-color:#c20c0c}.card.card--red-header .card-row{border-color:#4d4c4c;padding-top:0;padding-bottom:9px;margin-bottom:9px}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ClariusButtonComponent, selector: "clarius-button", inputs: ["label", "size", "iconMode", "state", "icon", "type", "primary"], outputs: ["buttonClick"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarius-table', template: "<!-- CARD MODE -->\n<div class=\"card\" *ngIf=\"mode === 'card'\" [class.card--red-header]=\"cardVariant === 'red-header'\">\n\n  <div class=\"card-header\" *ngIf=\"title\" [style.background]=\"headerBackground || ''\">\n    <span class=\"card-title\">{{ title }}</span>\n    <span *ngIf=\"headerLink\" class=\"card-arrow\" (click)=\"headerClicked.emit()\">&#8594;</span>\n  </div>\n\n  <div class=\"card-columns\" *ngIf=\"showColumnHeaders && rows.length > 0\">\n    <span class=\"card-col-header\" *ngFor=\"let col of columns\">{{ col.label }}</span>\n  </div>\n\n  <div class=\"card-empty\" *ngIf=\"emptyMessage && rows.length === 0\">\n    {{ emptyMessage }}\n  </div>\n\n  <div class=\"card-row\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <ng-container *ngFor=\"let col of columns\">\n\n      <span *ngIf=\"!col.type || col.type === 'text'\" class=\"card-cell\" [style.color]=\"col.textColor || ''\">\n        {{ row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'dot'\" class=\"card-cell\">\n        <span class=\"dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n      </span>\n\n      <span *ngIf=\"col.type === 'link'\" class=\"card-cell link-text\" (click)=\"onLinkClick(col.key, row, $event)\">\n        {{ col.linkText || row[col.key] }}\n      </span>\n\n      <span *ngIf=\"col.type === 'progress'\" class=\"card-cell\">\n        <span class=\"progress-circle\" [style.border-color]=\"getStatusColor(row[col.key + 'Status'] || 'default')\">\n          {{ row[col.key] }}\n        </span>\n      </span>\n\n    </ng-container>\n  </div>\n\n</div>\n\n<!-- TABLE MODE -->\n<div class=\"table\" *ngIf=\"mode === 'table'\" [class.gradient]=\"gradient\" [class.border-gradient]=\"borderGradient\" [class.light-weight]=\"lightWeight\" [class.large-text]=\"largeText\">\n\n  <div class=\"header\" *ngIf=\"!showLabels\">\n    <div class=\"header-cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n      <input *ngIf=\"col.type === 'checkbox'\" type=\"checkbox\" [checked]=\"allSelected\" [indeterminate]=\"someSelected\" (click)=\"toggleAll($event)\" />\n      <span *ngIf=\"col.type !== 'checkbox'\">{{ col.label }}</span>\n    </div>\n  </div>\n\n  <div class=\"row\" [class.row--dimmed]=\"row._dimmed\" *ngFor=\"let row of rows\" (click)=\"rowClicked.emit(row)\">\n    <div class=\"cell\" [class.col-actions]=\"col.type === 'actions'\" [class.col-checkbox]=\"col.type === 'checkbox'\" *ngFor=\"let col of columns\">\n\n      <ng-container *ngIf=\"col.type === 'checkbox'\">\n        <input type=\"checkbox\" [checked]=\"isSelected(row)\" (click)=\"toggleRow(row, $event)\" />\n      </ng-container>\n\n      <ng-container *ngIf=\"!col.type || col.type === 'text'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span [style.color]=\"col.textColor || ''\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status'\">\n        <span *ngIf=\"showLabels\" class=\"cell-label\">{{ col.label }}</span>\n        <span *ngIf=\"!statusDots\" class=\"badge\"\n          [style.color]=\"getStatusColor(row[col.key])\"\n          [style.background]=\"getStatusBackground(row[col.key])\"\n          [style.border]=\"getStatusBorder(row[col.key])\">\n          {{ row[col.key] }}\n        </span>\n        <span *ngIf=\"statusDots\" class=\"status-dot-wrapper\">\n          <span class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-text'\">\n        <span [style.color]=\"getStatusColor(row[col.key])\">{{ row[col.key] }}</span>\n      </ng-container>\n\n      <ng-container *ngIf=\"col.type === 'status-dot'\">\n        <span class=\"status-dot-wrapper\">\n          <span *ngIf=\"statusColors[row[col.key]]\" class=\"status-dot\" [style.background]=\"getStatusColor(row[col.key])\"></span>\n          <span [style.color]=\"statusColors[row[col.key]] ? getStatusColor(row[col.key]) : '#FFFFFF'\">{{ row[col.key] }}</span>\n        </span>\n      </ng-container>\n\n      <span *ngIf=\"col.type === 'actions'\" class=\"actions\">\n        <ng-container *ngFor=\"let a of actions\">\n          <img *ngIf=\"a.icon && a.icon.includes('/')\" class=\"icon-btn\" [src]=\"a.icon\" (click)=\"onActionClick(a.id, row, $event)\" />\n          <span *ngIf=\"a.icon && !a.icon.includes('/')\" class=\"icon-btn\" (click)=\"onActionClick(a.id, row, $event)\">{{ a.icon }}</span>\n          <clarius-button *ngIf=\"!a.icon\"\n            [label]=\"a.label\"\n            [size]=\"getButtonSize(a)\"\n            [primary]=\"isActionPrimary(a, row)\"\n            [state]=\"getActionState(a, row)\"\n            (buttonClick)=\"onActionButtonClick(a.id, row)\">\n          </clarius-button>\n        </ng-container>\n      </span>\n\n    </div>\n  </div>\n\n</div>\n", styles: [".table{border:1px solid #303030;border-radius:10px;background:#161616;padding:24px;font-family:Noto Sans,sans-serif}.header{display:flex;padding:0 0 24px;border-bottom:1px solid #303030}.header-cell{flex:1;font-size:12px;font-weight:400;color:#6b6b6b;white-space:nowrap;box-sizing:border-box}.row{display:flex;align-items:center;padding:0;min-height:56px;border-bottom:1px solid #303030;cursor:pointer}.row:last-child{border-bottom:none}.row:hover{background:#1e1e1e}.cell{flex:1;font-size:12px;font-weight:700;line-height:16px;color:#fff;padding:13px 0;box-sizing:border-box;display:flex;align-items:center;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.table.light-weight .cell{font-weight:400}.badge{display:inline-block;text-align:center;width:168px;height:24px;line-height:24px;border-radius:12px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}.status-dot-wrapper{display:flex;align-items:center;gap:6px}.status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}.col-actions{flex:1;display:flex;justify-content:flex-end}.col-checkbox{flex:0 0 40px}.actions{display:flex;gap:16px;align-items:center}.actions clarius-button{display:inline-block}.icon-btn{width:24px;height:24px;font-size:18px;cursor:pointer;padding:4px}.icon-btn img{width:100%;height:100%;object-fit:contain;filter:brightness(0) invert(1)}.icon-btn:hover{opacity:.7}.cell-label{font-size:12px;font-weight:400;color:#6b6b6b;line-height:16px}input[type=checkbox]{width:16px;height:16px;cursor:pointer;accent-color:#33BAEA}.row--dimmed .cell{color:#5b5b5b}.table.gradient{background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%)}.table.gradient .row{min-height:64px}.table.large-text .header-cell{font-size:16px}.table.large-text .cell{font-size:16px;font-weight:500}.table.large-text .row{min-height:auto;padding:11px 0}.table.border-gradient{border:1px solid transparent;border-image-source:linear-gradient(180deg,rgba(56,56,56,0) 0%,#222222 100%);border-image-slice:1}.card{border-radius:10px;background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%);font-family:Noto Sans,sans-serif;overflow-y:hidden;height:300px;padding:15px 24px 24px;box-sizing:border-box}.card:hover{overflow-y:auto}.card::-webkit-scrollbar{width:6px}.card::-webkit-scrollbar-track{background:#424242;box-shadow:inset 0 0 6px #6b6b6b4d}.card::-webkit-scrollbar-thumb{background:#B1B1B1;border-radius:20px;outline:1px solid slategrey}.card-header{display:flex;align-items:center;justify-content:space-between;padding:0;margin-bottom:10px}.card-title{font-size:18px;font-weight:400;color:#6b6b6b}.card-arrow{font-size:18px;color:#b1b1b1;cursor:pointer}.card-arrow:hover{color:#fff}.card-columns{display:flex;padding:0 0 18px;margin-top:10px}.card-col-header{flex:1;font-size:10.5px;font-weight:400;line-height:20px;color:#6b6b6b}.card-empty{display:flex;align-items:center;justify-content:center;height:200px;font-size:1rem;font-weight:600;color:#fff;opacity:.6}.card-row{display:flex;align-items:center;padding:11.5px 0;border-bottom:1px solid #4d4c4c;cursor:pointer}.card-row:last-child{border-bottom:none}.card-row:hover{background:rgba(255,255,255,.03)}.card-cell{flex:1;font-size:16px;font-weight:400;line-height:19px;color:#fff;text-overflow:ellipsis;word-break:break-all;overflow:hidden;white-space:nowrap;padding-right:16px}.dot{width:8px;height:8px;border-radius:50%;display:inline-block}.link-text{color:#33baea;cursor:pointer;font-weight:600;font-size:12px;text-align:right;text-transform:uppercase;padding-right:0}.link-text:hover{text-decoration:underline}.progress-circle{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:2px solid #6B6B6B;font-size:10px;font-weight:700;color:#fff}.card.card--red-header{background:linear-gradient(180deg,#850800fa -134.58%,rgb(0 0 0 / 53%) 111.21%);height:318px}.card.card--red-header .progress-circle{border-color:#c20c0c}.card.card--red-header .card-row{border-color:#4d4c4c;padding-top:0;padding-bottom:9px;margin-bottom:9px}\n"] }]
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
            }], largeText: [{
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
            }], cardVariant: [{
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

class NotificationCardComponent {
    constructor() {
        this.notifications = [];
        this.emptyMessage = 'There are no notifications to display.';
        this.clearAllClicked = new EventEmitter();
        this.itemClosed = new EventEmitter();
        this.actionClicked = new EventEmitter();
    }
    get hasNotifications() {
        return this.notifications.length > 0;
    }
    onClearAll() {
        this.clearAllClicked.emit();
    }
    onCloseItem(notification) {
        this.itemClosed.emit({ id: notification.id });
    }
    onActionClick(notification, action) {
        this.actionClicked.emit({ id: notification.id, action });
    }
    isCloseable(notification) {
        return !notification.possibleActions
            || notification.possibleActions.length === 0
            || (notification.possibleActions.length === 1 && notification.possibleActions[0] === 'CLEAR');
    }
    isSystemType(notification) {
        return notification.notificationType === 'SYSTEM';
    }
    hasActions(notification) {
        return !!notification.possibleActions
            && notification.possibleActions.length > 0
            && !(notification.possibleActions.length === 1 && notification.possibleActions[0] === 'CLEAR');
    }
    getTimeDisplay(time) {
        if (!time)
            return '';
        const now = new Date();
        const notifDate = new Date(time);
        if (isNaN(notifDate.getTime()))
            return time;
        const diffMs = now.getTime() - notifDate.getTime();
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours >= 1) {
            const options = {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            return new Intl.DateTimeFormat('en-US', options).format(notifDate);
        }
        return diffMinutes + ' minute(s) ago';
    }
}
NotificationCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NotificationCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NotificationCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NotificationCardComponent, selector: "clarius-notification-card", inputs: { notifications: "notifications", emptyMessage: "emptyMessage" }, outputs: { clearAllClicked: "clearAllClicked", itemClosed: "itemClosed", actionClicked: "actionClicked" }, ngImport: i0, template: "<div class=\"notification-card\">\n\n  <!-- Header -->\n  <div class=\"notification-header\" [class.has-notifications]=\"hasNotifications\">\n    <span class=\"notification-title\">Notifications</span>\n    <span *ngIf=\"hasNotifications\" class=\"clear-all\" (click)=\"onClearAll()\">CLEAR ALL</span>\n  </div>\n\n  <!-- Empty state -->\n  <div class=\"empty-state\" *ngIf=\"!hasNotifications\">\n    {{ emptyMessage }}\n  </div>\n\n  <!-- Notification list -->\n  <div *ngIf=\"hasNotifications\" class=\"notification-list\" [class.has-scrollbar]=\"hasNotifications\">\n    <div *ngFor=\"let notif of notifications; let isLast = last\">\n\n      <div class=\"notify-item\">\n        <!-- Check icon -->\n        <div class=\"notify-icon\">\n          <span class=\"check-icon\">&#10003;</span>\n        </div>\n\n        <!-- Content area -->\n        <div class=\"notify-content\">\n\n          <!-- Title row -->\n          <div class=\"notify-title-row\" *ngIf=\"notif.title && !isSystemType(notif)\">\n            <span class=\"notify-title\">{{ notif.title }}</span>\n                  <span *ngIf=\"isCloseable(notif) && !isSystemType(notif)\"\n                    class=\"close-icon\" (click)=\"onCloseItem(notif)\">&times;</span>\n          </div>\n\n          <!-- Message row -->\n          <div class=\"notify-message-row\">\n            <span class=\"notify-message\">{{ notif.message }}</span>\n                  <span *ngIf=\"isCloseable(notif) && (isSystemType(notif) || !notif.title)\"\n                    class=\"close-icon\" (click)=\"onCloseItem(notif)\">&times;</span>\n          </div>\n\n          <!-- Time -->\n          <div class=\"notify-time\" *ngIf=\"notif.time\">\n            {{ getTimeDisplay(notif.time) }}\n          </div>\n\n          <!-- Action buttons -->\n          <div class=\"notify-actions\" *ngIf=\"hasActions(notif)\">\n            <button *ngFor=\"let action of notif.possibleActions; let isLastAction = last\"\n              class=\"notify-btn\" [class.notify-btn-fill]=\"isLastAction\"\n              (click)=\"onActionClick(notif, action)\">\n              {{ action }}\n            </button>\n          </div>\n\n        </div>\n      </div>\n\n      <div class=\"notify-divider\" *ngIf=\"!isLast\"></div>\n    </div>\n  </div>\n\n</div>\n", styles: [".notification-card{position:relative;width:436px;height:317px;background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%);border-radius:10px;font-family:Noto Sans,sans-serif;padding:1rem 0;box-sizing:border-box;overflow:hidden}.notification-header{display:flex;justify-content:space-between;padding-bottom:10px;margin-bottom:20px;margin-right:24px}.notification-header.has-notifications{border-bottom:#5b5b5b 1px solid}.notification-title{font-size:18px;font-weight:500;color:#6b6b6b;margin-left:24px}.clear-all{font-size:13px;font-weight:400;color:#6bc4ea;cursor:pointer;white-space:nowrap}.clear-all:hover{text-decoration:underline}.empty-state{display:flex;align-items:center;justify-content:center;height:200px;font-size:1rem;font-weight:600;color:#fff;opacity:.6}.notification-list{margin-left:24px;height:calc(100% - 60px);overflow-y:auto;padding-right:10px;margin-right:8px}.notification-list::-webkit-scrollbar{width:6px}.notification-list::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #6b6b6b4d;background:#424242}.notification-list::-webkit-scrollbar-thumb{outline:1px solid slategrey;border-radius:20px;background:#B1B1B1}.notify-item{display:flex;gap:.8rem;min-height:46px}.notify-icon{flex:0 0 8%;display:flex;justify-content:center;align-items:flex-start}.check-icon{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:#00b35d;font-size:16px;font-weight:700;border:2px solid #00B35D;border-radius:50%}.notify-content{flex:1}.notify-title-row{display:flex;justify-content:space-between;align-items:flex-start}.notify-title{font-size:16px;font-weight:400;color:#fff;margin-bottom:10px}.close-icon{font-size:18px;color:#b1b1b1;cursor:pointer;flex-shrink:0;line-height:1}.close-icon:hover{color:#ff3b30}.notify-message-row{display:flex;justify-content:space-between;align-items:center;width:100%}.notify-message{font-size:14px;line-height:1.5em;font-weight:400;color:#b1b1b1;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;width:calc(100% - 30px)}.notify-time{font-size:12px;font-weight:400;color:#b1b1b1;padding-top:5px}.notify-actions{display:flex;justify-content:flex-end;gap:.8rem;margin-top:.5rem}.notify-btn{height:42px;font-size:14px;min-width:5rem;width:fit-content;background:transparent;border:1px solid #6B6B6B;border-radius:6px;color:#fff;cursor:pointer;font-family:Noto Sans,sans-serif;text-transform:capitalize}.notify-btn:hover{background:rgba(255,255,255,.1)}.notify-btn-fill{background:#33BAEA;border-color:#33baea;color:#000;font-weight:600}.notify-btn-fill:hover{background:#2aa0cc}.notify-divider{border-bottom:#5b5b5b 1px solid;margin:16px 0}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NotificationCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarius-notification-card', template: "<div class=\"notification-card\">\n\n  <!-- Header -->\n  <div class=\"notification-header\" [class.has-notifications]=\"hasNotifications\">\n    <span class=\"notification-title\">Notifications</span>\n    <span *ngIf=\"hasNotifications\" class=\"clear-all\" (click)=\"onClearAll()\">CLEAR ALL</span>\n  </div>\n\n  <!-- Empty state -->\n  <div class=\"empty-state\" *ngIf=\"!hasNotifications\">\n    {{ emptyMessage }}\n  </div>\n\n  <!-- Notification list -->\n  <div *ngIf=\"hasNotifications\" class=\"notification-list\" [class.has-scrollbar]=\"hasNotifications\">\n    <div *ngFor=\"let notif of notifications; let isLast = last\">\n\n      <div class=\"notify-item\">\n        <!-- Check icon -->\n        <div class=\"notify-icon\">\n          <span class=\"check-icon\">&#10003;</span>\n        </div>\n\n        <!-- Content area -->\n        <div class=\"notify-content\">\n\n          <!-- Title row -->\n          <div class=\"notify-title-row\" *ngIf=\"notif.title && !isSystemType(notif)\">\n            <span class=\"notify-title\">{{ notif.title }}</span>\n                  <span *ngIf=\"isCloseable(notif) && !isSystemType(notif)\"\n                    class=\"close-icon\" (click)=\"onCloseItem(notif)\">&times;</span>\n          </div>\n\n          <!-- Message row -->\n          <div class=\"notify-message-row\">\n            <span class=\"notify-message\">{{ notif.message }}</span>\n                  <span *ngIf=\"isCloseable(notif) && (isSystemType(notif) || !notif.title)\"\n                    class=\"close-icon\" (click)=\"onCloseItem(notif)\">&times;</span>\n          </div>\n\n          <!-- Time -->\n          <div class=\"notify-time\" *ngIf=\"notif.time\">\n            {{ getTimeDisplay(notif.time) }}\n          </div>\n\n          <!-- Action buttons -->\n          <div class=\"notify-actions\" *ngIf=\"hasActions(notif)\">\n            <button *ngFor=\"let action of notif.possibleActions; let isLastAction = last\"\n              class=\"notify-btn\" [class.notify-btn-fill]=\"isLastAction\"\n              (click)=\"onActionClick(notif, action)\">\n              {{ action }}\n            </button>\n          </div>\n\n        </div>\n      </div>\n\n      <div class=\"notify-divider\" *ngIf=\"!isLast\"></div>\n    </div>\n  </div>\n\n</div>\n", styles: [".notification-card{position:relative;width:436px;height:317px;background:linear-gradient(180deg,rgba(75,75,75,.2) 0%,rgba(31,31,31,.2) 100%);border-radius:10px;font-family:Noto Sans,sans-serif;padding:1rem 0;box-sizing:border-box;overflow:hidden}.notification-header{display:flex;justify-content:space-between;padding-bottom:10px;margin-bottom:20px;margin-right:24px}.notification-header.has-notifications{border-bottom:#5b5b5b 1px solid}.notification-title{font-size:18px;font-weight:500;color:#6b6b6b;margin-left:24px}.clear-all{font-size:13px;font-weight:400;color:#6bc4ea;cursor:pointer;white-space:nowrap}.clear-all:hover{text-decoration:underline}.empty-state{display:flex;align-items:center;justify-content:center;height:200px;font-size:1rem;font-weight:600;color:#fff;opacity:.6}.notification-list{margin-left:24px;height:calc(100% - 60px);overflow-y:auto;padding-right:10px;margin-right:8px}.notification-list::-webkit-scrollbar{width:6px}.notification-list::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #6b6b6b4d;background:#424242}.notification-list::-webkit-scrollbar-thumb{outline:1px solid slategrey;border-radius:20px;background:#B1B1B1}.notify-item{display:flex;gap:.8rem;min-height:46px}.notify-icon{flex:0 0 8%;display:flex;justify-content:center;align-items:flex-start}.check-icon{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:#00b35d;font-size:16px;font-weight:700;border:2px solid #00B35D;border-radius:50%}.notify-content{flex:1}.notify-title-row{display:flex;justify-content:space-between;align-items:flex-start}.notify-title{font-size:16px;font-weight:400;color:#fff;margin-bottom:10px}.close-icon{font-size:18px;color:#b1b1b1;cursor:pointer;flex-shrink:0;line-height:1}.close-icon:hover{color:#ff3b30}.notify-message-row{display:flex;justify-content:space-between;align-items:center;width:100%}.notify-message{font-size:14px;line-height:1.5em;font-weight:400;color:#b1b1b1;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;width:calc(100% - 30px)}.notify-time{font-size:12px;font-weight:400;color:#b1b1b1;padding-top:5px}.notify-actions{display:flex;justify-content:flex-end;gap:.8rem;margin-top:.5rem}.notify-btn{height:42px;font-size:14px;min-width:5rem;width:fit-content;background:transparent;border:1px solid #6B6B6B;border-radius:6px;color:#fff;cursor:pointer;font-family:Noto Sans,sans-serif;text-transform:capitalize}.notify-btn:hover{background:rgba(255,255,255,.1)}.notify-btn-fill{background:#33BAEA;border-color:#33baea;color:#000;font-weight:600}.notify-btn-fill:hover{background:#2aa0cc}.notify-divider{border-bottom:#5b5b5b 1px solid;margin:16px 0}\n"] }]
        }], propDecorators: { notifications: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], clearAllClicked: [{
                type: Output
            }], itemClosed: [{
                type: Output
            }], actionClicked: [{
                type: Output
            }] } });

class NotificationCardModule {
}
NotificationCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NotificationCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NotificationCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NotificationCardModule, declarations: [NotificationCardComponent], imports: [CommonModule], exports: [NotificationCardComponent] });
NotificationCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NotificationCardModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NotificationCardModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NotificationCardComponent],
                    imports: [CommonModule],
                    exports: [NotificationCardComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonIconMode, ButtonModule, ButtonSize, ButtonState, ClariusButtonComponent, ClariusDashboardComponent, ClariusDataModule, ClariusDataService, ClariusTableComponent, DashboardModule, NotificationCardComponent, NotificationCardModule, TableModule };
//# sourceMappingURL=clarius-ui.mjs.map
