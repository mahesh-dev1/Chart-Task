import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chart-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './chart-form.component.html',
  styleUrl: './chart-form.component.css'
})
export class ChartFormComponent {
  myform: FormGroup;

  @Output() formDataChange = new EventEmitter<any>();
  @Output() chartVisibilityChange = new EventEmitter<boolean>();

  constructor(public fb: FormBuilder) {
    this.myform = this.fb.group({
      data: this.fb.array([this.createDataGroup()])
    });
  }

  get dataArray(): FormArray {
    return this.myform.get('data') as FormArray;
  }

  createDataGroup() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      value: [null, [Validators.required, Validators.min(1)]]
    });
  }

  addRow() {
    this.dataArray.push(this.createDataGroup());
    this.emitData();
  }

  removeRow(index: number) {
    if (this.dataArray.length > 1) {
      this.dataArray.removeAt(index);
      this.emitData();
    }
  }

  emitData() {
    if (this.myform.valid) {
      this.formDataChange.emit(this.myform.value.data);
      this.chartVisibilityChange.emit(true);
    } else {
      this.chartVisibilityChange.emit(false);
    }
  }

  onSubmit() {
    if (this.myform.invalid) {
      this.myform.markAllAsTouched();
      return;
    }else{
      this.emitData();
    }
  }

  onInputChange(event:any){
    const value = event.target.value.trim();
    if (value === '') {
      this.emitData();
    } 
  }

  allowOnlyAlphabets(event: KeyboardEvent): void {
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
}
