import {Component, Input, OnInit} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {ResourceModule} from "../resource/resource.module";
import {FormatterService} from "../service/formatter/formatter.service";

// const resouses;
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  panelOpenState = false;
  mainResources: Array<ResourceModule> = new Array<ResourceModule>();
  params: Map<string, string> = new Map<string, string>();
  formattedText='';
  constructor(private formatter:FormatterService,private _mm: MatExpansionModule) {
    let properties=new Map<string, string>();
    let tags=new Map<string, string>();
    this.params.set("paramA","prAVAl");
    this.params.set("paramB","prBVAl");
    this.params.set("paramC","prCVAl");

    properties.set("prA","prAVAl");
    properties.set("prB","prBVAl");
    properties.set("prC","prCVAl");
    tags.set("tagA","tagAVal");
    tags.set("tagB","tagBVal");
    tags.set("tagC","taCAVal");

   let tempResource=new ResourceModule(properties,tags);
   tempResource.name='vpc-a'
   tempResource.type='VPC';
this.mainResources.push(tempResource);
  }

  ngOnInit(): void {
  }

  ResourceCreatedEventHandler(newResource: ResourceModule) {
    this.panelOpenState = false;
    this.mainResources.push(newResource);
    console.log(newResource)
    console.log(this.mainResources)
  }

  // newParameterCreated()
  updateFormattedText() {
    this.formattedText=  this.formatter.doFormat(this.params,this.mainResources,this.params);
    console.log(this.formattedText)
  }
  onDownload(){

  }
}
