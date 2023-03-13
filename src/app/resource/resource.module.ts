import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ResourceModule {

  properties: Map<string, string> | undefined;
  type:string='';
  constructor(properties: Map<string, string>) {
    this.properties = properties;

  }


}
