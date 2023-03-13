import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ResourceModule {


  properties: Map<string, string>;
  type: string|undefined;
  tags: Map<string, string>;

  constructor(properties: Map<string, string>, tags: Map<string, string>) {
    this.properties = properties;
    this.tags = tags;
  }


}
