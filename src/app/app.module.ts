import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MentionModule } from 'angular-mentions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    CustomTextareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MentionModule,
    MatTooltipModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
