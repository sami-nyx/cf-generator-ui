import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
interface Animal {
  name: string;
  sound: string;
}


// const resouses;
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  panelOpenState = false;
  resourceControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'S3', sound: 'aws::s3'},
    {name: 'VPC', sound: 'ec2::vpc'},
    {name: 'RDS', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
