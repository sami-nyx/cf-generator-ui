import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ResourceModule {
  constructor(resourceType:String,fields:Map<any, any>) {
  console.log(resourceType);
  console.log(fields);

  }
}
