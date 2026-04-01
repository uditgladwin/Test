import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationCardComponent } from './notification.component';

@NgModule({
  declarations: [NotificationCardComponent],
  imports: [CommonModule],
  exports: [NotificationCardComponent]
})
export class NotificationCardModule {}
