import {Injectable} from '@angular/core';
import {ResourceModule} from "../../resource/resource.module";

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() {
  }

  doFormat(params: Map<string, string>, resources: Array<ResourceModule>, tags: Map<string, string>) {
    let formatted = '';

    console.log(params)

    if (params.size > 0) {
      formatted += this._addNewLine(0, 'params:{');


      params.forEach((key, value) => {

          formatted += this._addNewLine(1, '"' + key + '":"' + value + '"');
        }
      )
      formatted += this._addNewLine(0, '}');

    }
    if (resources.length > 0) {
      formatted += this._addNewLine(0, 'resources:{');

      resources.forEach((resource)=>{
        formatted += this._addNewLine(1, resource.name+':{');
        if(resource.properties.size>0){
          formatted += this._addNewLine(2, 'properties:{');
          resource.properties.forEach((key,value)=>{

            formatted += this._addNewLine(3, '"' + key + '":"' + value + '"');
          })

          formatted += this._addNewLine(2, '}');

        }


        formatted += this._addNewLine(1, '}');
      })


      formatted += this._addNewLine(0, '}');

    }

    if(tags.size>0){
      formatted += this._addNewLine(0, 'tags:{');
      tags.forEach((key,value)=>{
        formatted += this._addNewLine(1, '"' + key + '":"' + value + '"');

      })
      formatted += this._addNewLine(0, '}');

    }
    return formatted;
  }

  private _addNewLine(number: number, param: string) {
    let buf = '';
    for (let i = 0; i < number; i++) buf += '\t';
    buf += '\t';
    return buf + param + '\n';
  }
}
