import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getAllStudent(): Observable<any> {
    return this.http.get(`${baseUrl}/getAllStudent`);
  }
  addStudent(data: {}): Observable<any> {
    return this.http.post(`${baseUrl}/addStudent`, data);
  }
  updateStudent(data: {}): Observable<any> {
    return this.http.put(`${baseUrl}/updateStudent`, data);
  }
  deleteStudent(data: {}): Observable<any> {
    return this.http.post(`${baseUrl}/deleteStudent`, data);
  }

}
