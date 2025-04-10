import { Component, ElementRef, Input, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @Input() chartData: any[] = [];

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']) {
      this.renderChart();
    }
  }

  renderChart() {
    const chartDom = this.el.nativeElement.querySelector('#chartContainer');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Pie Chart',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Values',
          type: 'pie',
          radius: '50%',
          data: this.chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }
}
