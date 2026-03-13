import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReportTableComponent } from './components/report-table/report-table.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, ReportTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Report Central 2.0';
}
