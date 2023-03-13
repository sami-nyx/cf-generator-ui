import {Component, Input, OnInit} from '@angular/core';
import {MatAccordionDisplayMode} from "@angular/material/expansion";
import {MatExpansionModule} from '@angular/material/expansion';
import {ResourceModule} from "../resource/resource.module";
// const resouses;
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  panelOpenState = false;
  mainResources:Array<ResourceModule>=new Array<ResourceModule>();
  constructor( private _mm:MatExpansionModule) {

  }

  ngOnInit(): void {
  }

  ResourceCreatedEventHandler(newResource: ResourceModule) {
    this.panelOpenState=false;
    this.mainResources.push(newResource);
console.log(newResource)
console.log(this.mainResources)
  }
}
