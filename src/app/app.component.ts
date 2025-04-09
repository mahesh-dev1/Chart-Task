import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as echarts from 'echarts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,NgFor,NgIf,FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  myform: FormGroup ;
  charShow = false;

  constructor(public fb:FormBuilder){
    this.myform = this.fb.group({
      data:this.fb.array([this.createDataGroup()])
    })
  }
  
  get dataArray(): FormArray {
    return this.myform.get('data') as FormArray;
  }
  createDataGroup(){
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      value: [null, [Validators.required, Validators.min(1)]]
    });
  }

  addRow() {
    this.charShow = false;
    this.dataArray.push(this.createDataGroup());
  }

  removeRow(index: number) {
    if(this.dataArray.length>1){
    this.dataArray.removeAt(index);
    this.showChartData();
    }
  }

  onInputChange(event:any){
    const value = event.target.value.trim();
    if (value === '') {
      this.charShow = false;
    } 
  }

  allowOnlyAlphabets(event: KeyboardEvent): void {
    // const charCode = event.key.charCodeAt(0);
    const isAlphabet = /^[A-Za-z ]$/.test(event.key);
    if (!isAlphabet) {
      event.preventDefault();
    }
  }

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === '+' || event.key === 'e') {
      event.preventDefault();
    }
  }

  preventArrowKeys(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }


  chartOption = {
    series: [
      {
        name: 'Example Pie',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 20, name: 'Apples' },
          { value: 30, name: 'Bananas' }
        ]
      }
    ]
  };
  
  generateChart() {
    if (this.myform.invalid) {
      this.charShow = false;
      this.myform.markAllAsTouched();
      return;
    }else{
      this.charShow = true;
      this.showChartData();
    }
  }

  showChartData(){
    const formValues = this.myform.value.data;

    const chartData = formValues.map((item: any) => ({
      name: item.name,
      value: item.value
    }));
  
    this.chartOption = {
      title: {
        text: 'Pie Chart',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      /* legend: {
        show: false
      }, */
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Values',
          type: 'pie',
          radius: '50%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }as any; 

      setTimeout(() => {
        const chartDom = document.getElementById('chartContainer')!;
        const myChart = echarts.init(chartDom);
        myChart.setOption(this.chartOption);
      }, 0);
  }



}
