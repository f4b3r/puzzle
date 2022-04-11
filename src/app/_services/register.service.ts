import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(username:string, password:string, email:string){
    console.log(`register user  ${username}  ${password}  ${email}`);
    return this.http.post<any>(`/users/register`, { username, password, email })
    .pipe(map(user => {
        
        return user;
    }));
    
  }
}
