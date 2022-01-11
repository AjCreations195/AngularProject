import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { commonStore, CommonStore } from '../../stores/common-store'
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from './user-details.model';
import { HttpErrorInterceptor } from 'src/app/service/http-error.interceptor';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  [x: string]: any;

  addUserForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    files:new FormControl(),

  });
  userList: any = []
  isSubmitted: boolean = false;
  UserModelObj: UserModel = new UserModel();
  public date = new Date();
  totalLength: any;
  page: number = 1;
  term: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  reverse!: boolean;
  key: string = 'id'
  UserError: string = '';
  public currentPage: number = 1;
  total: number = 0;

  constructor(
    private commonService: CommonService,
    private _http: HttpClient,
    private _fb: FormBuilder,
    public CommonStore: CommonStore,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public translateService: TranslateService,
    public HttpErrorInterceptor: HttpErrorInterceptor,
  ) {
  }

  ngOnInit(): void {
    this.pageChange()
    this.showAdd = true;
    this.showUpdate = false;
    this.addUserForm = this._fb.group({
      id: [0],
      title: ['', [Validators.required]],
      description: [''],
      is_active: [1],
      organization_id: [1],
      files:[]=[],
    });
    this.pageChange(this.currentPage)
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
        this.pageChange();
      })
    }
  }

  get _fc() {
    return this.addUserForm.controls;
  }

  reset() {
    this.addUserForm.reset();
    this.addUserForm.controls['is_active'].setValue(1);
    this.isSubmitted = false;
  }
  onEdit(data: any) {

    this.showAdd = false;
    this.showUpdate = true;
    this.addUserForm.patchValue({
      id: data.id,
      title: data.title,
      description: data.description,
    })
  }
  sort(key: string) {
    this.key = key
    this.reverse = !this.reverse
  }

  pageChange(newPage: number = 0) {
    if (newPage) this.CommonStore.setCurrentPage(newPage)

    this.commonService.getAll().subscribe((response) => {
      this.commonService.detectChanges(this.cdr)
      this.totalLength = response.data.length;
      console.log("ressisss",response);
      
    })
  }

}