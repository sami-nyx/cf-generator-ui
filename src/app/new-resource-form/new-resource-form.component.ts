import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ResourceModule} from "../resource/resource.module";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {ResourceService} from "../service/resource/resource.service";

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

  } else if (value == 'VPCGatewayAttachment') {
    temp = new Map<string, string>([
      ["InternetGatewayId", "String"],
      ["VpcId", "String"],

    ]);
  } else if (value == 'Subnet') {
    temp = new Map<string, string>([
      ["VpcId", "String"],
      ["AvailabilityZone", "String"],
      ["CidrBlock", "String"],
      ["MapPublicIpOnLaunch", "Boolean"],

    ]);
  } else if (value == 'EIP') {
    temp = new Map<string, string>([
      ["VpcId", "String"],
      ["AvailabilityZone", "String"],
      ["CidrBlock", "String"],
      ["MapPublicIpOnLaunch", "Boolean"],

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
export class NewResourceFormComponent implements OnInit {
  @Output() resourceCreated = new EventEmitter;
  @Input() params: Map<string, string> = new Map<string, string>();
  @Input() existingResources: Array<ResourceModule> = new Array<ResourceModule>();

  resourceControl = new FormControl<Resource | null>(null, Validators.required);
  properties: Map<string, string> = new Map<string, string>();
  resourceName: string = '';

  resource = new ResourceModule(new Map<string, string>(), new Map<string, string>());
  selectedProperties: Map<string, string> = new Map<string, string>();
  tags: Map<string, string> = new Map<string, string>();

  resources: Map<string, string>;
  firstFormGroup = this._formBuilder.group({
    resourceType: [''],
    resourceName: ['']
  });
  secondFormGroup = this._formBuilder.group({
    key: [''],
    value: [''],
    type: ['']
  });
  tagsFormGroup = this._formBuilder.group({
    key: [''],
    value: ['']
  });


  constructor(private _resourceService: ResourceService, private _formBuilder: FormBuilder) {

    this.resources = new Map<string, string>();
  }


  printPros() {
    if (this.firstFormGroup.value.resourceType == null)
      return
    if (this.firstFormGroup.value.resourceName == null)
      return

    this.resource.type = this.firstFormGroup.value.resourceType;
    this.resource.name = this.firstFormGroup.value.resourceName;

    this.properties = getProperties(this.resource.type);

  }

  submitA() {
    this.selectedProperties = new Map<string, string>();
    this.selectedProperties = new Map<string, string>();
    this.tags = new Map<string, string>();

    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.tagsFormGroup.reset();
    this.secondFormGroup.value.type = 'direct';
    this.resourceCreated.emit(this.resource);
    this.resource = new ResourceModule(new Map<string, string>(), new Map<string, string>());


  }

  addProperty() {
    let tempKey = this.secondFormGroup.value.key;
    let tempVal = this.secondFormGroup.value.value;
    if (tempVal == null || tempVal == '')
      return
    if (tempKey == null || tempKey == '')
      return
    this.resource.properties.set(tempKey, tempVal);
    this.secondFormGroup.reset();
    console.log(this.secondFormGroup.value.type);
    this.secondFormGroup.value.type = 'direct';
  }

  addTag() {
    let tempKey = this.tagsFormGroup.value.key;
    let tempVal = this.tagsFormGroup.value.value;

    if (tempKey == null || tempKey == '')
      return
    if (tempVal == null || tempVal == '')
      return
    this.resource.tags.set(tempKey, tempVal);

    this.tagsFormGroup.reset();

  }

  onRadioChange() {
    console.log(this.secondFormGroup.value.type);
    console.log(this.params);
  }

  ngOnInit(): void {
    this._resourceService.makeSignedGetRequest().subscribe((response) => {
      let temp = <Array<string>>(JSON.parse(response.body).data);

      temp.forEach((item) => {

        let parts = item.split('::');
        this.resources.set((parts[1] + '-' + parts[2]), item)
      })
    });

  }
}

