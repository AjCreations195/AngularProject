import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routingComponents } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MobxAngularModule } from 'mobx-angular';
import { CommonService } from 'src/app/service/common.service'
import { CommonStore } from '../stores/common-store';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NavComponent } from './nav/nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ModalComponent } from './modal/modal.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { HttpErrorInterceptor } from '../service/http-error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    routingComponents,
    NavComponent,
    UserProfileComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    FormsModule,
    OrderModule,
    Ng2OrderModule,
    HttpClientModule,
    ReactiveFormsModule,
    MobxAngularModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AngularFileUploaderModule,
    AngularMyDatePickerModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
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
    routingComponents, NavComponent,
  ],
  providers: [CommonService, CommonStore, UserDetailsComponent,
    UserProfileComponent, ModalComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class UserModule { }
