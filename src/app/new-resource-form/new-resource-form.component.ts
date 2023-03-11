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
@Output() resourceCreated=new EventEmitter
  properties: Map<string, string> = new Map<string, string>();
  selectedTags: Map<string, string> = new Map<string, string>();


  resources: Resource[] = [
    {name: 'S3', logicalName: 'aws::s3'},
    {name: 'VPC', logicalName: 'ec2::vpc'},
  ];

  onSelected(value: String) {


    this.properties = getProperties(value);
    console.log(value)
  }


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    key: [''],
    value: ['']
  });

  constructor(private _formBuilder: FormBuilder) {

  }

  printPros() {
    console.log(this.properties)
  }

  submitA() {
    let resourceProperties: Map<string, string> = this.selectedTags;
    this.selectedTags = new Map<string, string>();
    console.log(resourceProperties);
    console.log(this.selectedTags);

    let createdResource: ResourceModule = new ResourceModule(resourceProperties);
   this.resourceCreated.emit(createdResource);
    // ResourceModule=new ResourceComponent(properties);
// console.log(this.resourceControl)
// console.log(this.firstFormGroup)

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

