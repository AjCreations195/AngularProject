import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { reportObserved } from 'mobx/dist/internal';
import { catchError, map, Observable, throwError } from 'rxjs';
import { commonStore, CommonStore } from 'src/app/stores/common-store';
import { UserPaginationResponse } from '../user/user-details/user-details.model';
@Injectable({
  providedIn: 'root'
})
export class CommonService {


  url: string = "https://v2-dev-api.isorobot.io/api/v1/organization-policies/"

  authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM1MWE2YmExNWIyNzc5YzgzY2Y4YTFiNTU1NDU3MTc4N2E3Y2QyZjE5YzMzNGY4MGM5NzJlOWIxNDgzZGQ0MWE4ZTU2N2RkOWMxMDcxYjZmIn0.eyJhdWQiOiIxIiwianRpIjoiYzUxYTZiYTE1YjI3NzljODNjZjhhMWI1NTU0NTcxNzg3YTdjZDJmMTljMzM0ZjgwYzk3MmU5YjE0ODNkZDQxYThlNTY3ZGQ5YzEwNzFiNmYiLCJpYXQiOjE2NDAwNTk3OTUsIm5iZiI6MTY0MDA1OTc5NSwiZXhwIjoxNjcxNTk1Nzk1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.DAo0LwTH4fCpnDO1ShIzPBFTEkS7Hr6Xrw3flVHgQQTNArUyBFN-mthbGRMcVxK1v6IcUqw25Glydlxm0056g2Tm7OFRFdbXSdm9cjRy4b1o33eoH1a1cINmDkELUlsoncnwgOpeAjj24H4hy_RR-AW-iDCMIr4iTn1TcnWI5aQgaJQuN_r_xJOVVIUjc5JU3wIYblrU_6m89E_yY2RwIYIot5fgf2i2QVIYTaVydVV9X2v6fXszXynFyHT5Lm4hKuL4m0blbksTxLRgGLeAnEORcLjR6F0UOX6xjG8xL4ccQGcEuLk3kpU8ZgOEaPLwpfHQl6r-cpXp65IZzzK-s-lnW5qegMvwGDHWdHnG61i12O6WgfVSvSFntS0wsYHVXC6432I8_2d0iwRdht7Yi6p2mzyc-HmXm7dMEdh-c5RZoAmN0HdKbzEkv4JtRnRjahbveZZThxetbN0FqeeHc5R97squScLjzNr6BDC8ZpDMuGZCaeU_MVH1KREwJKodHmcSJjhOZnaXz3pIGiuKORtbZZig2Hf2PIu6zrUe5ogHrlth6sFD-aLm-EI8BwFf88j--Ja32PkgVO_Y5xfeycq2jgyQ83cXK_eHCBR5YU7DXryKz04eAOOIa92fx1LrfDEcW9RSJZDNJiaiczMDksKK22nf4vC_E_F0eG20QrE"
  auth = `Bearer ${this.authToken}`;
  Headers = new HttpHeaders();
  Header = this.Headers.set('Authorization', this.auth)
  Error: string = ''
  fileName = '';

  constructor(
    private _http: HttpClient,
    private CommonStore: CommonStore) { }

  detectChanges(cdr: ChangeDetectorRef) {
    cdr.detectChanges();
  }

  getAll(): Observable<UserPaginationResponse> {
    let params = `?page=${this.CommonStore.currentPage}`
    return this._http.get<UserPaginationResponse>("https://v2-dev-api.isorobot.io/api/v1/organization-policies" + (params ? params : ''), { headers: this.Header })
      .pipe(
        map((res: UserPaginationResponse) => {
          this.CommonStore.setUser(res)
          console.log(res,"resssss");

          return res;
        })

      );

  }
  AddUser(data: any): Observable<any> {
    console.log("data",data);
    
    return this._http.post("https://v2-dev-api.isorobot.io/api/v1/organization-policies", data, { headers: this.Header })
    
    .pipe(
        map((res: any) => {
          this.CommonStore.setUsers(res)
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          this.Error = error.error.errors.title[0]
          console.log("jaffffff", this.Error);
          this.CommonStore.setError(this.Error)
          throw this.Error
        })
      );
  }
  deleteUser(id: number) {
    return this._http.delete(this.url + id, { headers: this.Header })
  }

  getCurrentData(id: number) {
    return this._http.get(this.url + id, { headers: this.Header })
      .pipe(
        map((res: any) => {
          this.CommonStore.setUsers(res)

          return res;
        })
      );
  }
  editUser(id: number, data: any): Observable<any> {
    return this._http.put(this.url + id, data, { headers: this.Header })
      .pipe(
        map((res: any) => {
          this.CommonStore.setUsers(res)
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          this.Error = error.error.errors.title[0]
          this.CommonStore.setError(this.Error)
          throw this.Error
        })

      );
  }
}

