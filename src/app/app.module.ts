import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MentionModule } from 'angular-mentions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTextareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MentionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
