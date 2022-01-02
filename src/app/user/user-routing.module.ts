import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    {path:'',redirectTo:'/user-details',pathMatch:'full'},
    {path:'user-details', component:UserDetailsComponent},
    {path:'user-profile/:id',component:UserProfileComponent},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
export const routingComponents = [UserDetailsComponent]

