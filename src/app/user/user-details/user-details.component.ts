import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonStore } from '../../stores/common-store'
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from './user-details.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-details.component.css']
})


export class UserDetailsComponent implements OnInit {
  userList: any = [];
  addUserForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),

  });
  isSubmitted: boolean = false;
  UserModelObj: UserModel = new UserModel();
  public date = new Date();

  constructor(
    private commonService: CommonService,
    private _http: HttpClient,
    private _fb: FormBuilder,
    public CommonStore: CommonStore,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private route: ActivatedRoute,
    public translateService: TranslateService
  ) {
    this.translateService.addLangs(['en', 'ar'])
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

  }

  totalLength: any;
  page: number = 1;
  term: any;
  showAdd: boolean = true;
  showUpdate!: boolean;

  ngOnInit(): void {
    this.getAll()
    this.addUserForm = this._fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z ]*$")]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      is_active: [1],
      organization_id: [1]

    });
    this.addUserForm.reset();
  }
  clickAddUser() {
    this.addUserForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  deleteUser(id: number) {
    if (confirm("Are you Sure?")) {
      this.commonService.deleteUser(id).subscribe(() => {
        this.getAll();
      })
    }
  }
  getAll() {
    this.commonService.getAll().subscribe((response) => {
      this.commonService.detectChanges(this.cdr)
      this.totalLength = response.data.length
      // this.userList = response;
    })
  }
  get _fc() {
    return this.addUserForm.controls;
  }

  save() {


    this.UserModelObj.title = this.addUserForm.value.title;
    this.UserModelObj.description = this.addUserForm.value.description;

    this.commonService.AddUser(this.UserModelObj).subscribe(Response => {
      this.commonService.detectChanges(this.cdr)

      alert('User Added Successfully');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAll();
      this.addUserForm.reset();

    })

  }
  reset() {
    this.addUserForm.reset();
    this.addUserForm.controls['is_active'].setValue(1);
    this.isSubmitted = false;
  }
  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.addUserForm.controls['id'].setValue(data.id)
    this.addUserForm.controls['title'].setValue(data.title)
    this.addUserForm.controls['description'].setValue(data.description)
    this.addUserForm.controls['id'].setValue(data.id)
    this.addUserForm.controls['organization_id'].setValue(data.organization_id)

  }

  editUser() {
    this.UserModelObj.id = this.addUserForm.value.id;
    this.UserModelObj.title = this.addUserForm.value.title;
    this.UserModelObj.description = this.addUserForm.value.description;

    this.commonService.editUser(this.UserModelObj.id, this.UserModelObj).subscribe(response => {
      alert("Updated Succeesfully");
      let ref = document.getElementById('cancel')
      ref?.click();

      this.getAll();
      this.addUserForm.reset();
    })
  }
}






