import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { LandingComponent } from './landing/landing.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HeaderComponent } from './header/header.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import { ResourceComponent } from './resource/resource.component';
import { NewResourceFormComponent } from './new-resource-form/new-resource-form.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import { ParamsComponent } from './params/params.component';

const routes: Routes = [
  { path: 'createTemplate', component: CreateTemplateComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component:LandingComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    CreateTemplateComponent,
    ResourceComponent,
    NewResourceFormComponent,
    ParamsComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        MatSlideToggleModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        MatToolbarModule,
        AppRoutingModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatStepperModule,
        MatInputModule,
        MatListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
