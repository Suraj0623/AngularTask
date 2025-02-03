import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl=environment.apiBaseUrl+'Employees'
  

  constructor(private http: HttpClient) { }
  
  getEmployees(): Observable<{ id: number, name: string, department: string }[]> {
    return this.http.get<{ id: number, name: string, department: string }[]>(this.apiUrl);
  }
  getEmployeeById(id: string) {
    return this.http.get<{ id: number, name: string, department: string }>(`/api/employees/${id}`);
  }
}
