import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    {path:'',redirectTo:'/user-details',pathMatch:'full'},
    {path:'user-details', component:UserDetailsComponent},
    {path:'add-user', component:AddUserComponent},
    {path:'edit-user/:id',component:EditUserComponent},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
export const routingComponents = [UserDetailsComponent, AddUserComponent, EditUserComponent]

