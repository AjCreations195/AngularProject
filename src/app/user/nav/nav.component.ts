import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public translateService: TranslateService
  ) {
    this.translateService.addLangs(['en', 'ar'])
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

  }
  ngOnInit(): void {
  }
}
