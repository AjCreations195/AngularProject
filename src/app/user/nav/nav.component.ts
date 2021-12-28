import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/service/common.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserModel } from '../user-details/user-details.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() addvisible!: boolean
  @Input() editvisible!: boolean

  UserModelObj: UserModel = new UserModel()
  constructor(
    public translateService: TranslateService,
    public route: ActivatedRoute,
    public UserDetailsComponent: UserDetailsComponent,
    private CommonService: CommonService
  ) {
    this.translateService.addLangs(['en', 'ar'])
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

  }

  showAdd!: boolean;
  showUpdate!: boolean;
  addUserForm = this.UserDetailsComponent.addUserForm
  ngOnInit(): void {
  }



  clickAddUser() {
    this.addUserForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  id = this.route.snapshot.params['id']

  onEdit() {
    this.CommonService.getCurrentData(this.id).subscribe((response: any) => {
      this.showAdd = false;
      this.showUpdate = true;


      this.addUserForm.controls['title'].setValue(response.title)
      this.addUserForm.controls['description'].setValue(response.description)

    })

  }



}
