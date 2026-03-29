import { EventEmitter } from '@angular/core';
import { ButtonState, ButtonSize, ButtonIconMode } from './button.enums';
import * as i0 from "@angular/core";
export declare class ClariusButtonComponent {
    label: string;
    size: ButtonSize;
    iconMode: ButtonIconMode;
    state: ButtonState;
    icon: string;
    type: 'button' | 'submit';
    primary: boolean;
    buttonClick: EventEmitter<void>;
    ButtonState: typeof ButtonState;
    ButtonSize: typeof ButtonSize;
    ButtonIconMode: typeof ButtonIconMode;
    get isDisabled(): boolean;
    get isLoading(): boolean;
    get hasIcon(): boolean;
    get buttonClasses(): string;
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClariusButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClariusButtonComponent, "clarius-button", never, { "label": "label"; "size": "size"; "iconMode": "iconMode"; "state": "state"; "icon": "icon"; "type": "type"; "primary": "primary"; }, { "buttonClick": "buttonClick"; }, never, never, false>;
}
