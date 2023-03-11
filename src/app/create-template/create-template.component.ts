import { Component, OnInit } from '@angular/core';

// const resouses;
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  panelOpenState = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  ResourceCreatedEventHandler(newResource: any) {
console.log(newResource)
  }
}
