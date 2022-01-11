import { UserModule } from "../user.module";

export class UserModel{
    id:number=0;
    title:string='';
    description:string='';
    organization_id:number=1;
    files:File[]=[];

}


export interface UserPaginationResponse {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
    from: number;
    data: UserModel[];
}