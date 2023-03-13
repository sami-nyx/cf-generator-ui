import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent {


  constructor(private _formBuilder: FormBuilder) {
    this.params.set('first', 'value');
  }

  parameterTypes: string[] = [
    "String",
    "Number",
    "List<Number>",
  "CommaDelimitedList",
    "AWS-Specific Parameter Types",
    "SSM Parameter Types"
  ];
  paramsFormGroup = this._formBuilder.group({
    key: [''],
    value: ['']
  });
  params: Map<string, string> = new Map<string, string>();


  addParam() {
    let tempKey = this.paramsFormGroup.value.key;
    let tempVal = this.paramsFormGroup.value.value;
    if (tempVal == null || tempVal == '')
      return
    if (tempKey == null || tempKey == '')
      return
    this.params.set(tempKey, tempVal)
    this.paramsFormGroup.reset();

  }
}
