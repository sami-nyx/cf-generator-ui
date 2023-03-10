import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-new-resource-form',
  templateUrl: './new-resource-form.component.html',
  styleUrls: ['./new-resource-form.component.css']
})
export class NewResourceFormComponent implements OnInit {
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
