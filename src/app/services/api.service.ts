import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  saveData(data:any){
    return this.http.post<any>("http://localhost:3000/userDb",data)
  }

  getData(){
    return this.http.get<any>("http://localhost:3000/userDb")
  }

  putData(id:number,data:any){
    return this.http.put<any>("http://localhost:3000/userDb/" + id, data)
  }

  deleteData(id:number){
    return this.http.delete<any>("http://localhost:3000/userDb/"+ id)

  }
}
