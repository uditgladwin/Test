import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonState, ButtonSize, ButtonIconMode } from './button.enums';

@Component({
  selector: 'clarius-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ClariusButtonComponent {
  @Input() label = '';
  @Input() size: ButtonSize = ButtonSize.Large;
  @Input() iconMode: ButtonIconMode = ButtonIconMode.WithoutIcon;
  @Input() state: ButtonState = ButtonState.Default;
  @Input() icon = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() primary = false;

  @Output() buttonClick = new EventEmitter<void>();

  ButtonState = ButtonState;
  ButtonSize = ButtonSize;
  ButtonIconMode = ButtonIconMode;

  get isDisabled(): boolean {
    return this.state === ButtonState.Disabled || this.state === ButtonState.Loading;
  }

  get isLoading(): boolean {
    return this.state === ButtonState.Loading;
  }

  get hasIcon(): boolean {
    return this.iconMode === ButtonIconMode.WithIcon && !!this.icon;
  }

  get buttonClasses(): string {
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

  onClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }
}
