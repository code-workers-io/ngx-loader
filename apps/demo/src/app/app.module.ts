import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {NgxLoaderDirectiveModule, NgxLoaderModule} from "@code-workers.io/ngx-loader";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, NgxLoaderModule, HttpClientModule, NgxLoaderDirectiveModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
