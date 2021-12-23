import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routingComponents } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MobxAngularModule } from 'mobx-angular';
import { CommonService } from 'src/app/service/common.service'
import { CommonStore } from '../stores/common-store';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NavComponent } from './nav/nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    routingComponents,
    NavComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MobxAngularModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
  exports: [
    routingComponents, NavComponent
  ],
  providers: [CommonService, CommonStore]
})
export class UserModule { }
