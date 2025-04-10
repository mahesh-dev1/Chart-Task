import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartComponent } from './chart/chart.component';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet,
            FontAwesomeModule,
            ChartComponent,
            ChartFormComponent,
            NgIf
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(){ }
  
  chartData: any[] = [];
  showChart = false;

  onFormDataChange(data: any) {
    this.chartData = data;
  }

}
