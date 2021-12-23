import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormBuilder } from '@angular/forms';
import { CommonStore } from '../../stores/common-store'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-details.component.css']
})


export class UserDetailsComponent implements OnInit {
  userList: any = [];

  public date = new Date();

  constructor(
    private commonService: CommonService,
    private _http: HttpClient,
    private _fb: FormBuilder,
    public CommonStore: CommonStore,
    public cdr: ChangeDetectorRef,
    public translateService: TranslateService
  ) { }

  totalLength: any;
  page: number = 1;
  term: any;

  deleteUser(id: number) {
    if (confirm("Are you Sure?")) {
      this.commonService.deleteUser(id).subscribe(() => {
        this.getAll();
      })
    }
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.commonService.getAll().subscribe((response) => {
      this.commonService.detectChanges(this.cdr)
      this.totalLength = response.data.length
      // this.userList = response;
    })
  }
}




