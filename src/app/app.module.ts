import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BubblesComponent } from './bubbles/bubbles.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop'





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BubblesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatFormFieldModule,
    DragDropModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
