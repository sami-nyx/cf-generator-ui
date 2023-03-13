import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ResourceModule} from "../resource/resource.module";

interface Resource {
  name: string;
  logicalName: string;
}

function getProperties(value: String) {
  let temp;
  if (value == 'VPC') {
    temp = new Map<string, string>([
      ["RegionName", "String"],
      ["CidrBlock", "String"],
      ["EnableDnsHostnames", "Boolean"],
      ["EnableDnsSupport", "Boolean"],
      ["InstanceTenancy", "String"],
      ["Ipv4IpamPoolId", "String"],
      ["Tags", "Map"]
    ]);

  } else {
    temp = new Map<string, string>([
      ["AllocatedStorage", "String"],
      ["AllowMajorVersionUpgrade", "Boolean"],
      ["AutoMinorVersionUpgrade", "Boolean"],
      ["AvailabilityZone", "String"],
      ["BackupRetentionPeriod", "Integer"],
      ["CACertificateIdentifier", "String"],
      ["CertificateRotationRestart", "Boolean"],
    ]);
  }
  return temp;

}

@Component({
  selector: 'app-new-resource-form',
  templateUrl: './new-resource-form.component.html',
  styleUrls: ['./new-resource-form.component.css']
})
export class NewResourceFormComponent {
  resourceControl = new FormControl<Resource | null>(null, Validators.required);
  resourceName:string='';
@Output() resourceCreated=new EventEmitter
  properties: Map<string, string> = new Map<string, string>();
  selectedTags: Map<string, string> = new Map<string, string>();


  resources: Resource[] = [
    {name: 'S3', logicalName: 'aws::s3'},
    {name: 'VPC', logicalName: 'ec2::vpc'},
  ];



  firstFormGroup = this._formBuilder.group({
    resourceType: [''],
  });
  secondFormGroup = this._formBuilder.group({
    key: [''],
    value: ['']
  });

  constructor(private _formBuilder: FormBuilder) {

  }
  onSelected() {
    let tempResource=this.firstFormGroup.value.resourceType;
    this.resourceName=(<Resource><unknown>tempResource).name;
    this.properties = getProperties(this.resourceName);

  }

  printPros() {
    console.log(this.properties)
  }

  submitA() {
    let resourceProperties: Map<string, string> = this.selectedTags;
    this.selectedTags = new Map<string, string>();
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    let createdResource: ResourceModule = new ResourceModule(resourceProperties);
    createdResource.type=this.resourceName;
   this.resourceCreated.emit(createdResource);


  }

  addProperty() {
    let tempKey = this.secondFormGroup.value.key;
    let tempVal = this.secondFormGroup.value.value;
    if (tempVal == null || tempVal == '')
      return
    if (tempKey == null || tempKey == '')
      return
    this.selectedTags.set(tempKey, tempVal)
    this.secondFormGroup.reset();

  }
}

