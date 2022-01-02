import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: 'user', loadChildren: () =>
      import('./user/user.module').then(x => x.UserModule)
  },
  { path: '', redirectTo: '/user-details', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
